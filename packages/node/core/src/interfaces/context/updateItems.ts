import {ActionExtras} from '../../internal/types/actionExtras';
import {ContextItem} from '../../internal/types/data';

export type UpdateContextItemsResult = {
    success: true;
} | {
    success: false;
    error: string;
};

export type UpdateContextItemsHandler = (
    contextId: string,
    data: Record<string, Omit<ContextItem, 'itemId'>>,
    extras: ActionExtras,
) => Promise<UpdateContextItemsResult>;
