import {
    ActionExtras,
    ActionHandlerConfig,
    actionIds,
    asOpenAiChatModel,
    asValidActionId,
    createRuntime,
    defaultActionHandlers,
    OpenAiRuntimeConfig,
} from '@nlbridge/core';
import {NextFunction, Request, Response} from 'express';
import {error} from '../utils/error';
import {warn} from '../utils/warn';
import {assist} from './actions/assistant/assist';
import {chat} from './actions/chat/chat';
import {chatStream} from './actions/chat/chatStream';
import {createContext} from './actions/context/create';
import {discardContext} from './actions/context/discard';
import {getContext} from './actions/context/get';
import {removeItems} from './actions/context/removeItems';
import {removeTasks} from './actions/context/removeTasks';
import {resetItems} from './actions/context/resetItems';
import {resetTasks} from './actions/context/resetTasks';
import {updateItems} from './actions/context/updateItems';
import {updateTasks} from './actions/context/updateTasks';
import {MiddlewareConfig} from './config';
import {validatePayloadForAction} from './validators/payload';

const actionById: {
    [key: string]: (
        run: any, payload: any, req: Request, res: Response,
    ) => void | Promise<void>
} = {
    'chat': chat,
    'chat-stream': chatStream,
    'assist': assist,

    'create-context': createContext,
    'get-context': getContext,
    'discard-context': discardContext,

    'reset-context-items': resetItems,
    'update-context-items': updateItems,
    'remove-context-items': removeItems,

    'reset-context-tasks': resetTasks,
    'update-context-tasks': updateTasks,
    'remove-context-tasks': removeTasks,
};

export const defaultMiddleware = (
    api: 'openai',
    config: MiddlewareConfig,
) => middleware(api, defaultActionHandlers, config);

export const middleware = (
    api: 'openai',
    actionHandlers: ActionHandlerConfig,
    config: MiddlewareConfig,
) => {
    if (!config.apiKey) {
        throw new Error('Missing required API key for OpenAI middleware. Please provide an API key.');
    }

    const model = asOpenAiChatModel(config.chatModel);
    const {run} = createRuntime<OpenAiRuntimeConfig>(
        actionHandlers,
        config.llmInstructions,
        {
            apiKey: config.apiKey,
            chatModel: model,
        },
    );

    return async (req: Request, res: Response, next: NextFunction) => {
        if (req.headers['content-type'] !== 'application/json') {
            res.status(400).send(
                'Invalid Content-Type header. ' +
                'Please ensure that the request body is a valid JSON object and that the Content-Type header is set to application/json.',
            );

            return;
        }

        if (!req.body) {
            error(
                '@nlbridge/express | 500\n' +
                'Invalid use of @nlbridge/express middleware: The request body is not available in req.body.\n' +
                'Please ensure that the request body is available by using a body parser middleware before the @nlbridge/express middleware.',
            );

            res.status(500).send(
                'Internal nlbridge middleware error occurred.'
            );

            return;
        }

        if (typeof req.body === 'string') {
            try {
                req.body = JSON.parse(req.body);
            } catch (e) {
                warn('@nlbridge/express middleware was unable to parse the request body as JSON.');
                res.status(400).send(
                    'Invalid request body. ' +
                    'Please ensure that the request body is a valid JSON object.',
                );
                return;
            }
        }

        if (typeof req.body !== 'object' || req.body === null || Object.keys(req.body).length === 0) {
            res.status(400).send(
                {
                    status: 'error',
                    message: '@nlbridge/express middleware found invalid request body. ' +
                        'Value must be a non-null non-empty JSON object.',
                },
            );
            return;
        }

        // By this time we know that req.body is a valid JSON object
        const {action, payload} = req.body;
        const actionId = asValidActionId(action);

        // Check if the payload is a valid @nlbridge request
        if (!actionId) {
            res.status(400).send(
                {
                    status: 'error',
                    message: 'Action is not valid. ' +
                        'Please ensure that the action provided is a valid action ID. ' +
                        'Valid action IDs are: ' + actionIds.join(', '),
                },
            );

            return;
        }

        const validationResult = validatePayloadForAction(actionId, payload);
        if (!validationResult.success) {
            res.status(400).send(
                {
                    status: 'error',
                    message: `Invalid payload for action "${actionId}". ${validationResult.error}`,
                },
            );

            return;
        }

        //
        // Execute the action
        //
        const actionHandler = actionById[actionId];
        if (actionHandler) {
            try {
                await actionHandler(run, payload, req, res);
            } catch (e) {
                error(`@nlbridge/express middleware encountered an error when handling the request: ${e?.toString()}`);
                res.status(500).send('Internal server error while executing action.');
            }
            return;
        }

        res.status(500).send(
            {
                status: 'error',
                message: `The action provided "${actionId}" is not supported.`,
            },
        );
    };
};
