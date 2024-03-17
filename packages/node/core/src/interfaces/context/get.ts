import {ActionExtras} from '../../internal/types/actionExtras';
import {ContextItems, ContextTasks} from '../../internal/types/data';

export type GetContextResult = {
    success: true;
    items: ContextItems | undefined;
    tasks: ContextTasks | undefined;
} | {
    success: false;
    error: string;
};

export type GetContextHandler = (
    contextId: string,
    itemOrTaskId: string | undefined,
    type: 'data' | 'task' | undefined,
    extras: ActionExtras,
) => Promise<GetContextResult>;
