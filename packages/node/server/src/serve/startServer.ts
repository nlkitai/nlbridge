import {createServer} from '../utils/createServer';
import {log} from '../utils/log';

const dir = console.dir;

export const startServer = (config: {
    [key: string]: string[];
}): Promise<{
    api: string,
    port: number,
    endpoint: string,
    method: 'post',
}> => {
    return new Promise((resolve, reject) => {
        const debug = !!config.debug;

        if (debug) {
            log('');
            log('Starting @nlbridge/server with config:');
            dir(config, {depth: null, colors: true, compact: false, breakLength: 80});
            log('');
        }

        //
        // Check API and retrieve the API key
        //
        const apiConfig = Array.isArray(config.api) && config.api.length > 0
            ? config.api[0]
            : undefined;

        const apiUntyped = apiConfig?.toLowerCase();
        if (!apiUntyped || apiUntyped !== 'openai') {
            reject('Invalid argument [--api <value>] : Only OpenAI is supported at the moment');
            return;
        }

        const api = apiUntyped;
        const apiKey = config.apiKey && config.apiKey.length > 0 ? config.apiKey[0] : process.env.OPENAI_API_KEY;
        if (!apiKey) {
            reject(
                'Missing API key! Please provide an API key using the [--apiKey <value>] argument ' +
                'or the recommended environment variable');
            return;
        }

        const cors = Array.isArray(config.cors) && config.cors.length > 0
            ? config.cors[0]
            : undefined;

        //
        // Transform the config into usable server options
        //
        const portFromConfig = Array.isArray(config.port) && config.port.length > 0
            ? Number(config.port[0])
            : null;

        const port = portFromConfig && Number.isFinite(portFromConfig) && portFromConfig > 0
            ? portFromConfig
            : Math.floor(Math.random() * 1000) + 8000;

        const rawEndpoint = Array.isArray(config.endpoint) && config.endpoint.length > 0 && config.endpoint[0].length
        > 0
            ? config.endpoint[0]
            : undefined;

        //
        // Create an express app
        //
        const endpointWithoutLeadingSlashes = rawEndpoint ? rawEndpoint.replace(/^\/+/g, '') : '';
        const endpoint = endpointWithoutLeadingSlashes.replace(/\/+$/g, '');
        const app = createServer({
            api,
            apiKey,
            endpoint,
            cors,
            debug,
        });

        //
        // Start listening on the specified port
        //
        const actualEndpoint = endpoint ? (endpoint.startsWith('/') ? endpoint : `/${endpoint}`) : '/';
        app.listen(port, () => {
            resolve({
                api,
                port,
                endpoint: actualEndpoint,
                method: 'post',
            });
        }).on('error', (err: any) => {
            reject(err);
        });
    });
};
