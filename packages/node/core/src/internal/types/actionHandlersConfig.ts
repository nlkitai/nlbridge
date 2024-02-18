import {ChatHandler} from '../../interfaces/chat/chat';
import {ChatStreamHandler} from '../../interfaces/chat/chatStream';
import {ClearContextHandler} from '../../interfaces/context/clear';
import {GetContextDataHandler} from '../../interfaces/context/get';
import {SetContextHandler} from '../../interfaces/context/set';
import {UpdateContextHandler} from '../../interfaces/context/update';

export type ActionHandlerConfig = {
    'chat': ChatHandler;
    'chat-stream': ChatStreamHandler;
    'set-context': SetContextHandler;
    'update-context': UpdateContextHandler;
    'get-context-data': GetContextDataHandler;
    'clear-context': ClearContextHandler;
};
