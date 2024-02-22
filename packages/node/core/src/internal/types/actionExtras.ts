import {ContextData, ContextTaskData} from './context';
import {ConversationItem} from './conversation';

// Data always passed to any action as last argument
export type ActionExtras<RuntimeConfig = any> = {
    contextId?: string;
    getContextData?: (itemId?: string) => Promise<ContextData | undefined>;
    getTasksData?: () => Promise<ContextTaskData | undefined>;
    conversationHistory?: Readonly<ConversationItem[]>;
    config?: RuntimeConfig;
};
