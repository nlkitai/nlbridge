import {AssistHandler} from '../../interfaces/assistant/assist';
import {RegisterTaskHandler} from '../../interfaces/assistant/registerTask';
import {UnregisterTaskHandler} from '../../interfaces/assistant/unregisterTask';
import {ChatHandler} from '../../interfaces/chat/chat';
import {ChatStreamHandler} from '../../interfaces/chat/chatStream';
import {ClearContextHandler} from '../../interfaces/context/clear';
import {GetContextDataHandler} from '../../interfaces/context/get';
import {SetContextHandler} from '../../interfaces/context/set';
import {UpdateContextHandler} from '../../interfaces/context/update';

export type ActionHandlerConfig = {
    // Chat handlers
    'chat': ChatHandler;
    'chat-stream': ChatStreamHandler;

    // Context handlers
    'set-context': SetContextHandler;
    'update-context': UpdateContextHandler;
    'get-context-data': GetContextDataHandler;
    'clear-context': ClearContextHandler;

    // Assistant handlers
    'assist': AssistHandler;
    'register-task': RegisterTaskHandler;
    'unregister-task': UnregisterTaskHandler;
};
