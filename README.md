# Map Router for Koa
This is a Koa map router built by Ginkgoch. It includes predefined mapping RESTful APIs of maps you created.

## Install
```
yarn add ginkgoch-koa-map-router
```

## Usage
```javascript
import path from 'path';
import Koa from "koa";
import { MapRouter } from 'ginkgoch-koa-map-router';
import { MapEngine, Srs, ShapefileFeatureSource, Projection, FeatureLayer, FillStyle } from "ginkgoch-map";

function getInitMap(name) {
    const CRS_GOOGLE = 'EPSG:900913';
    let mapEngine = new MapEngine(256, 256);
    mapEngine.name = name;
    mapEngine.srs = new Srs(CRS_GOOGLE);

    let sourcePath = path.resolve(__dirname, '../data/cntry02.shp');
    let source = new ShapefileFeatureSource(sourcePath);
    source.projection = new Projection(CRS_GOOGLE, CRS_GOOGLE);
    
    let layer = new FeatureLayer(source);
    layer.styles.push(new FillStyle('#f0f0f0', '#636363', 1));
    mapEngine.pushLayer(layer);

    return mapEngine;
}

function serve() {
    const port = 3000;
    const app = new Koa();
    const mapRouter = new MapRouter({ initMap: getInitMap }).getRouter();
    app.use(mapRouter.routes()).use(mapRouter.allowedMethods());
    app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
}

serve();
```

## Predefined APIs
