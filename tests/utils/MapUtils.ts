import path from 'path';
import { MapEngine, Srs, ShapefileFeatureSource, FeatureLayer, FillStyle, Projection } from "ginkgoch-map";

const CRS_GOOGLE = 'EPSG:900913';

export class MapUtils {
    static getInitMapEngine(name: string): MapEngine {
        // Create a engine with size 256 * 256 pixels
        let mapEngine = new MapEngine(256, 256);
        mapEngine.name = name;

        // Init the map rendering spatial reference system
        mapEngine.srs = new Srs(CRS_GOOGLE);

        let sourcePath = path.resolve(__dirname, '../data/cntry02.shp');

        // Create a feature source instance
        let source = new ShapefileFeatureSource(sourcePath);
        source.projection = new Projection(CRS_GOOGLE, CRS_GOOGLE);
        
        // Create a feature layer instance
        let layer = new FeatureLayer(source);

        // Define a style for feature layer
        layer.styles.push(new FillStyle('#f0f0f0', '#636363', 1));

        // Push the feature layer into map
        mapEngine.pushLayer(layer);

        return mapEngine;
    }
}