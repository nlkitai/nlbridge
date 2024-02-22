import {clearContext} from './handlers/demo/clearContext';
import {getContextData} from './handlers/demo/getContextData';
import {registerContextTask} from './handlers/demo/registerContextTask';
import {setContext} from './handlers/demo/setContext';
import {unregisterContextTask} from './handlers/demo/unregisterTask';
import {updateContext} from './handlers/demo/updateContext';
import {openAiAssist} from './handlers/openai/assist';
import {openAiChat} from './handlers/openai/chat';
import {openAiChatStream} from './handlers/openai/chatStream';
import {ActionHandlerConfig} from './internal/types/actionHandlersConfig';

export const defaultActionHandlers: ActionHandlerConfig = {
    'chat': openAiChat,
    'chat-stream': openAiChatStream,

    'set-context': setContext,
    'update-context': updateContext,
    'get-context-data': getContextData,
    'clear-context': clearContext,

    'assist': openAiAssist,
    'register-task': registerContextTask,
    'unregister-task': unregisterContextTask,
};
