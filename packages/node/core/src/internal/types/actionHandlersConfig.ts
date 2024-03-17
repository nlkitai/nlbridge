import {AssistHandler} from '../../interfaces/chat/assist';
import {ChatHandler} from '../../interfaces/chat/chat';
import {ChatStreamHandler} from '../../interfaces/chat/chatStream';
import {CreateContextHandler} from '../../interfaces/context/create';
import {DiscardContextHandler} from '../../interfaces/context/discard';
import {GetContextHandler} from '../../interfaces/context/get';
import {RemoveContextItemsHandler} from '../../interfaces/context/removeItems';
import {RemoveContextTasksHandler} from '../../interfaces/context/removeTasks';
import {ResetContextItemsHandler} from '../../interfaces/context/resetItems';
import {ResetContextTasksHandler} from '../../interfaces/context/resetTasks';
import {UpdateContextItemsHandler} from '../../interfaces/context/updateItems';
import {UpdateContextTasksHandler} from '../../interfaces/context/updateTasks';

export type ActionHandlerConfig = {
    // Chat handlers
    'chat': ChatHandler;
    'chat-stream': ChatStreamHandler;
    'assist': AssistHandler;

    // Context handlers
    'create-context': CreateContextHandler;
    'get-context': GetContextHandler;
    'discard-context': DiscardContextHandler;

    // Context data handlers
    'reset-items': ResetContextItemsHandler;
    'update-items': UpdateContextItemsHandler;
    'remove-items': RemoveContextItemsHandler;

    // Task handlers
    'reset-tasks': ResetContextTasksHandler;
    'update-tasks': UpdateContextTasksHandler;
    'remove-tasks': RemoveContextTasksHandler;
};
