import {clearContext} from './handlers/demo/clearContext';
import {getContextData} from './handlers/demo/getContextData';
import {setContext} from './handlers/demo/setContext';
import {updateContext} from './handlers/demo/updateContext';
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
};
