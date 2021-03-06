import _ from 'lodash';
import bodyParser from 'koa-body';
import Router, { RouterContext } from 'koa-router';
import { MapEngine, Geometry, Point, GeometryFactory, ViewportUtils, Projection, ShapefileFeatureSource, IFeature, TileCache } from 'ginkgoch-map';
import { FilterUtils, MapUtils } from '../shared';

export interface MapRouterOptions {
    maps?: Array<MapEngine>;
    initMap?: (name: string) => MapEngine;
    enableTileCache?: boolean;
    cacheTilesCapacity?: number;
}

export class MapRouter {
    private _options: MapRouterOptions;
    private _mapEnginesCache = new Map<string, MapEngine>();
    private _mapTileCache = new Map<string, TileCache<Buffer>>();

    constructor(mapRouterOptions?: MapRouterOptions) {
        this._options = _.defaults(mapRouterOptions, { 
            enableTileCache: true, 
            cacheTilesCapacity: 128, 
            initMap: (name: string) => { 
                const mapEngine = new MapEngine(256, 256);
                mapEngine.name = name;
                return mapEngine;
            } 
        });
        if (this._options.maps !== undefined) {
            this._options.maps.forEach(m => this.maps.set(m.name, m));
        }
    }

    get maps() {
        return this._mapEnginesCache;
    }

    getRouter(): Router {
        let router = new Router();

        router.get('get map', '/maps/:map', this.$getMapEngineRoute.bind(this));

        router.put('edit map', '/maps/:map', bodyParser(), this.$editMapEngineRoute.bind(this));

        router.get('get xyz tile', '/maps/:map/tiles/xyz/:z/:x/:y', this.$getMapXyzTile.bind(this));

        router.get('get intersected features', '/maps/:map/query/intersection', this.$getIntersection.bind(this));

        router.get('get groups', '/maps/:map/groups', this.$getLayerGroups.bind(this));

        router.get('get a group', '/maps/:map/groups/:group', this.$getLayerGroup.bind(this));

        router.get('get layers from group', '/maps/:map/groups/:group/layers', this.$getLayers.bind(this));

        router.get('get a layer from group', '/maps/:map/groups/:group/layers/:layer', this.$getLayer.bind(this));

        router.get('get features from a layer in group', '/maps/:map/groups/:group/layers/:layer/features', this.$getFeatures.bind(this));

        router.post('query features from a layer in group', '/maps/:map/groups/:group/layers/:layer/query', bodyParser(), this.$queryFeatures.bind(this));
        
        router.get('get properties from a layer in group', '/maps/:map/groups/:group/layers/:layer/properties', this.$getProperties.bind(this));
        
        router.get('get property from a layer in group', '/maps/:map/groups/:group/layers/:layer/properties/:field', this.$getProperty.bind(this));
        
        router.get('get fields from a layer in group', '/maps/:map/groups/:group/layers/:layer/fields', this.$getFields.bind(this));

        return router;
    }

    /**
     * Get map instance from cache, 
     * if not exists, init map if initMap handler is set
     * otherwise, throw 404
     * @param {RouterContext} ctx 
     */
    private _getMapEngine(ctx: RouterContext) {
        let name = this._getMapEngineName(ctx);

        let mapEngine: MapEngine|undefined = undefined;
        if (this._mapEnginesCache.has(name)) {
            mapEngine = this._mapEnginesCache.get(name);
        }

        if (mapEngine === undefined && this._options.initMap !== undefined) {
            mapEngine = this._options.initMap!(name);
            this._mapEnginesCache.set(name, mapEngine);
        }

        if (mapEngine === undefined) {
            ctx.throw(404, `Map "${name}" not found`);
        }

        return mapEngine;
    }

    private _getMapEngineName(ctx: RouterContext) {
        let name = ctx.params.map;
        if (name === undefined) {
            ctx.throw(400, 'Map name is not specified');
        }
        return name;
    }

    private _getMapTileCache(ctx: RouterContext) {
        if (!this._options.enableTileCache) {
            return undefined;
        }

        let name = this._getMapEngineName(ctx);
        let tileCache: TileCache<Buffer>|undefined = undefined;
        if (this._mapTileCache.has(name)) {
            tileCache = this._mapTileCache.get(name);
        }

        if (tileCache === undefined) {
            tileCache = new TileCache<Buffer>(this._options.cacheTilesCapacity);
            this._mapTileCache.set(name, tileCache);
        }

        return tileCache;
    }

    private _clearMapTileCache(name: string) {
        let tileCache = this._mapTileCache.get(name);
        if (tileCache !== undefined) {
            tileCache.clear();
        }
    }

    private $getMapEngineRoute(ctx: RouterContext) {
        const mapEngine = this._getMapEngine(ctx);
        this._json(ctx, mapEngine);
    }

    private $editMapEngineRoute(ctx: RouterContext) {
        let requestBody = this._parseRequestBody(ctx);
        let mapEngine = MapEngine.parseJSON(requestBody);
        let name = this._getMapEngineName(ctx);

        this._mapEnginesCache.set(name, mapEngine);
        this._clearMapTileCache(name);
        this._json(ctx, mapEngine.toJSON());
    }

    private async $getMapXyzTile(ctx: RouterContext) {
        const tileCache = this._getMapTileCache(ctx);
        const { z, x, y } = ctx.params;
        const tileName = `${z}-${x}-${y}`;
        
        let imageBuffer: Buffer|undefined;
        if (tileCache !== undefined && tileCache._cache.has(tileName)) {
            imageBuffer = tileCache.get(tileName);
        }
        
        if (imageBuffer === undefined) {
            const mapEngine = this._getMapEngine(ctx);
            let image = await mapEngine.xyz(x, y, z);
            imageBuffer = image.toBuffer();
            tileCache?.push(tileName, imageBuffer);
        }
        
        ctx.type = 'png';
        ctx.body = imageBuffer;
        ctx.length = imageBuffer.length;
    }

    private async $getIntersection(ctx: RouterContext) {
        const params = FilterUtils.parseIntersectionFilter(ctx);
        if (params.geom === undefined
            || (params.geom.length !== 2 && params.geom.length !== 4)
            || params.geomSrs === undefined
            || params.level === undefined
            || params.tolerance === undefined) { 
            ctx.throw(400, new Error('Intersection parameter is not valid. Be sure the geom, geomSrs, level and tolerance are properly set.'));
        }

        const mapEngine = this._getMapEngine(ctx);
        let geom: Geometry;
        if (params.geom!.length === 2) {
            const [x, y] = params.geom!;
            geom = new Point(x, y);
        }
        else {
            const [minx, miny, maxx, maxy] = params.geom!;
            geom = GeometryFactory.envelopeAsPolygon({ minx, miny, maxx, maxy });
        }

        const features = await mapEngine.intersection(geom, params.geomSrs!, params.level!, params.tolerance!);

        if (params.simplify) {
            const scale = mapEngine.scales[params.level!];
            features.forEach(l => ViewportUtils.compressFeatures(l.features, mapEngine.srs.projection!, scale, 1));
        }

        if (params.outSrs && params.outSrs !== mapEngine.srs.projection) {
            const proj = new Projection(mapEngine.srs.projection, params.outSrs);
            features.forEach(l => l.features.forEach(f => f.geometry = proj.forward(f.geometry)));
        }

        let featuresJSON = features.map(l => ({ layer: l.layer, features: MapUtils.featuresToJSON(l.features) }));
        return this._json(ctx, featuresJSON);
    }

    private $getLayerGroups(ctx: RouterContext) {
        const mapEngine = this._getMapEngine(ctx);
        const groups = mapEngine.groups.map(g => g.toJSON());
        this._json(ctx, groups);
    }

    private async $getLayerGroup(ctx: RouterContext) {
        const mapEngine = this._getMapEngine(ctx);
        const group = mapEngine.group(ctx.params.group);
        if (group === undefined) {
            this._notFound(ctx, `Group ${ctx.params.group} is not found.`);
        }
        else {
            this._json(ctx, group.toJSON());
        }
    }

    private $getLayers(ctx: RouterContext) {
        const mapEngine = this._getMapEngine(ctx);
        const group = mapEngine.group(ctx.params.group);
        if (group === undefined) {
            this._notFound(ctx, `Group ${ctx.params.group} is not found.`);
        }
        else {
            this._json(ctx, group.layers.map(l => l.toJSON()));
        }
    }

    private async $getLayer(ctx: RouterContext) {
        const mapEngine = this._getMapEngine(ctx);
        const layer = mapEngine.layer(ctx.params.layer, ctx.params.group);
        if (layer === undefined) {
            this._notFound(ctx, `Layer ${ctx.params.layer} is not found in group ${ctx.params.group}.`);
        }
        else {
            let json = layer.toJSON();
            try {
                await layer.open();
                json.envelope = await layer.source.envelope();
                json.count = await layer.source.count();
                json.geomType = MapUtils.shapefileTypeToGeomType((<ShapefileFeatureSource>layer.source).shapeType);
            }
            finally {
                await layer.close();
            }

            json = FilterUtils.applyLayerFilterFromContext(json, ctx);
            this._json(ctx, json);
        }
    }

    private async $getFeatures(ctx: RouterContext) {
        const mapEngine = this._getMapEngine(ctx);
        const layer = mapEngine.layer(ctx.params.layer, ctx.params.group);
        if (layer === undefined) {
            this._notFound(ctx, `Layer ${ctx.params.layer} is not found in group ${ctx.params.group}.`);
        }
        else {
            const filter = FilterUtils.parseFeaturesFilter(ctx, mapEngine);

            try {
                await layer.open();
                let features: IFeature[] = await layer.source.features(filter.envelope, filter.fields);
                features = FilterUtils.applyFeaturesFilter(features, filter);
                features = FilterUtils.applySimplifyFilter(features, ctx, mapEngine);
                features = FilterUtils.applyFeaturesCRS(features, ctx, mapEngine);
                this._json(ctx, MapUtils.featuresToJSON(features));
            }
            finally {
                await layer.close();
            }
        }
    }

    private async $queryFeatures(ctx: RouterContext) {
        const mapEngine = this._getMapEngine(ctx);
        const layer = mapEngine.layer(ctx.params.layer, ctx.params.group);
        if (layer === undefined) {
            this._notFound(ctx, `Layer ${ctx.params.layer} is not found in group ${ctx.params.group}.`);
        }
        else {
            const bodyContent = this._parseRequestBody(ctx);
            const queryFilter = FilterUtils.parseQueryFilter(bodyContent);

            if (queryFilter === undefined) {
                ctx.throw('400', 'Invalid query body');
            }

            try {
                await layer.open();
                let { relation, geometry, geometryCRS, fields } = queryFilter;
                let features: IFeature[] = await layer.source.query(relation, geometry, geometryCRS, fields);

                let featuresFilter = FilterUtils.parseFeaturesFilter(ctx, mapEngine);
                features = FilterUtils.applyFeaturesFilter(features, featuresFilter);
                features = FilterUtils.applySimplifyFilter(features, ctx, mapEngine);
                features = FilterUtils.applyFeaturesCRS(features, ctx, mapEngine);
                this._json(ctx, MapUtils.featuresToJSON(features));
            }
            finally {
                await layer.close();
            }
        }
    }

    private async $getProperties(ctx: RouterContext) {
        const mapEngine = this._getMapEngine(ctx);
        const layer = mapEngine.layer(ctx.params.layer, ctx.params.group);
        if (layer === undefined) {
            this._notFound(ctx, `Layer ${ctx.params.layer} is not found in group ${ctx.params.group}.`);
        }
        else {
            const filter = FilterUtils.parseFeaturesFilter(ctx, mapEngine);

            try {
                await layer.open();
                let properties = await layer.source.properties(filter.fields);
                properties = FilterUtils.applyPropertiesFilter(properties, filter);
                this._json(ctx, properties);
            }
            finally {
                await layer.close();
            }
        }
    }

    private async $getProperty(ctx: RouterContext) {
        const mapEngine = this._getMapEngine(ctx);
        const layer = mapEngine.layer(ctx.params.layer, ctx.params.group);
        if (layer === undefined) {
            this._notFound(ctx, `Layer ${ctx.params.layer} is not found in group ${ctx.params.group}.`);
        }
        else {
            const filter = FilterUtils.parseFeaturesFilter(ctx, mapEngine);
            const fieldName = ctx.params.field;

            try {
                await layer.open();
                let properties = await layer.source.properties([fieldName]);
                properties = FilterUtils.applyPropertiesFilter(properties, filter);

                let propertyValues = properties.map(p => _.has(p, fieldName) ? _.result(p, fieldName) : null);
                propertyValues = FilterUtils.applyPropertyAggregatorsFromContext(propertyValues, ctx);
                this._json(ctx, propertyValues);
            }
            finally {
                await layer.close();
            }
        }
    }

    private async $getFields(ctx: RouterContext) {
        const mapEngine = this._getMapEngine(ctx);
        const layer = mapEngine.layer(ctx.params.layer, ctx.params.group);
        if (layer === undefined) {
            this._notFound(ctx, `Layer ${ctx.params.layer} is not found in group ${ctx.params.group}.`);
        }
        else {
            try {
                await layer.open();
                const fields = await layer.source.fields();

                let fieldsJSON: any[] = fields.map(f => f.toJSON());
                fieldsJSON = FilterUtils.applyFieldTypesFilterFromContext(fieldsJSON, ctx);
                fieldsJSON = FilterUtils.applyFieldsFilterFromContext(fieldsJSON, ctx);

                this._json(ctx, fieldsJSON);
            }
            finally {
                await layer.close();
            }
        }
    }

    private _json(ctx: RouterContext, json: any, status: number = 200) {
        ctx.body = json;
        ctx.type = 'json';
        ctx.status = status;
    }

    private _parseRequestBody(ctx: RouterContext): any {
        let bodyJSON: any = ctx.request.body;
        if (!/json/i.test(ctx.request.headers['content-type'])) {
            bodyJSON = JSON.parse(bodyJSON);
        }

        return bodyJSON;
    }
    
    private _notFound(ctx: RouterContext, message: string) {
        ctx.throw(404, message);
    }
}