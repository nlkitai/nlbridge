import {defaultMiddleware, MiddlewareConfig} from '@nlbridge/express';
import express, {NextFunction, Request, Response} from 'express';
import {error} from './error';
import {log} from './log';

export type ServerConfig = {
    api: 'openai';
    apiKey: string;
    endpoint?: string;
    cors?: string;
    debug: boolean;
};

export const createServer = (config: ServerConfig) => {
    const app = express();
    app.use(express.json({}));
    app.use(express.urlencoded({extended: false}));

    // Cors configuration
    const cors = config.cors ?? '*';
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', cors);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    // Error handling
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        error(err);

        if (err instanceof SyntaxError) {
            return res
                .status(400)
                .send({status: 404, message: err.message});
        }

        error(`Internal server error occurred - ${err.message}`);
        res.status(500).send('Internal server error occurred.');
    });

    // Register the server
    const endpoint = config.endpoint
        ? (config.endpoint.startsWith('/') ? config.endpoint : `/${config.endpoint}`)
        : '/';

    if (config.debug) {
        log(`Registering server with endpoint: POST ${endpoint}`);
        log('');
    }

    const middlewareConfig: MiddlewareConfig = {
        apiKey: config.apiKey,
    }

    const nlbridge = defaultMiddleware(config.api, middlewareConfig);
    app.post(endpoint, nlbridge);

    return app;
};
