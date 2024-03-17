import {createContext} from './handlers/demo/context/create';
import {discardContext} from './handlers/demo/context/discard';
import {getContext} from './handlers/demo/context/get';
import {removeItems} from './handlers/demo/context/removeItems';
import {removeTasks} from './handlers/demo/context/removeTasks';
import {resetItems} from './handlers/demo/context/resetItems';
import {resetTasks} from './handlers/demo/context/resetTasks';
import {updateItems} from './handlers/demo/context/updateItems';
import {updateTasks} from './handlers/demo/context/updateTasks';
import {openAiAssist} from './handlers/openai/assist';
import {openAiChat} from './handlers/openai/chat';
import {openAiChatStream} from './handlers/openai/chatStream';
import {ActionHandlerConfig} from './internal/types/actionHandlersConfig';

export const defaultActionHandlers: ActionHandlerConfig = {
    'chat': openAiChat,
    'chat-stream': openAiChatStream,
    'assist': openAiAssist,

    'create-context': createContext,
    'discard-context': discardContext,
    'get-context': getContext,

    'reset-items': resetItems,
    'update-items': updateItems,
    'remove-items': removeItems,

    'reset-tasks': resetTasks,
    'update-tasks': updateTasks,
    'remove-tasks': removeTasks,
};
