import {ConversationItem} from './conversation';
import {ContextItem, ContextItems, ContextTasks} from './data';
import {LlmInstructions} from './llmInstructions';

// Data always passed to any action as last argument
export type ActionExtras<RuntimeConfig = any> = {
    contextId?: string;
    getContextItems?: () => Promise<ContextItems | undefined>;
    getContextItem?: (itemId: string) => Promise<ContextItem | undefined>;
    getContextTasks?: () => Promise<ContextTasks | undefined>;
    getLlmInstructions: () => LlmInstructions;
    conversationHistory?: Readonly<ConversationItem[]>;
    config?: RuntimeConfig;
};
