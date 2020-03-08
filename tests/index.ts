import Koa from "koa";
import compress from 'koa-compress';
import cors from '@koa/cors';
import logger from 'koa-logger';
import { MapRouter } from '../src';
import { MapUtils } from './utils';

const port = 3000;

function serve() {
    const app = new Koa();
    app.use(logger());
    app.use(cors());
    app.use(compress({
        threshold: 1024,
        filter: contentType => /image/i.test(contentType) || /json/i.test(contentType)
    }));

    let mapRouter = new MapRouter({ initMap: MapUtils.getInitMapEngine }).getRouter();
    app.use(mapRouter.routes()).use(mapRouter.allowedMethods());

    app.listen(port, () => {
        console.log(`Server listening on port ${port}, visit http://localhost:${port}`);
    });
}

serve();