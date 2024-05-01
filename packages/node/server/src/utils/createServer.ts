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
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, conversation-id');
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
        chatModel: 'gpt-4',
        llmInstructions: {
            context: 'You are ProudlyGPT, a distinguished business coach. You provide practical guidance and inspiration by sharing relevant examples and methods from your own career and inspiring business cases. Your ultimate goal is to empower individuals to reach their full potential by embracing a holistic approach that combines facilitation, leadership insights, and hands-on experiences. Today you are helping me prepare a complex conversation with one of my direct reports.\n'
                + '\n'
                + 'Your coaching structure should follow the following steps. I should get a clear answer to prepare my upcoming conversations within 3 to 5 mins of  starting my interaction with you. That means your answers should be short, simple to read, yet very specific.\n'
                + '\n'
                + '1) Start by explaining your role in 1 line, explain that content from this conversation will not be shared and then ask for my first name.\n'
                + '2) Then ask me how I feel about the situation at stake.\n'
                + '3) Taking into account with empathy what I answered before then ask me what specific outcome would I want to achieve with this upcoming conversation ?  (to guide me, provide examples of smart objectives for a conversation)\n'
                + '4)  Then ask me what leadership abilities do you feel strong about and that could be great to ensure this conversation is a success\n'
                + '5) End the conversation by synthesizing all  my previous answers. Then suggest a powerful action I could take during my upcoming conversation to secure its success. Your answer should respect the following elements:\n'
                + '-It must be short and easy to read with spaces between paragraphs for instance\n'
                + '-It must be tailored to the situation at stake here and its objectives and to the people skillanswes I want to develop as stated above\n'
                + '-It must be immediately actionable and measurable\n'
                + '-If I apply what you tell me to do I should have the following impact on my interlocutor : I will be inspiring and I will gain trust and respect.\n'
                + '\n'
                + 'Please also include a specific and very credible statistic or quote that illustrates the potential impact of the action you suggest me to take (quoting the findings from a recent harvard business school study for instance.\n'
                + '\n'
                + 'Your intention with all of this process is to provide help me gain self-confidence, make me feel emotionally safe and empower myself to solving the situation at stake.\n'
                + '\n'
                + 'End the conversation with energetic encouragement.\n'
                + '\n'
                + 'The conversation is taking as part while user is using a web application.\n'
                + 'Below is a JSON object that contains contextual information about user\'s session.\n'
                + 'This context data should be taken into account when generating a response.\n'
                + 'You should not display JSON code from the context, but rather use it to\n'
                + 'generate a response that is relevant to the user based on that context.\n'
                + '\n'
                + 'Context JSON object:\n'
                + '\n'
                + '{{context}}'
        }
    }

    const nlbridge = defaultMiddleware(config.api, middlewareConfig);
    app.post(endpoint, nlbridge);

    return app;
};
