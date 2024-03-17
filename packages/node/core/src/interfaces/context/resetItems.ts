import {ActionExtras} from '../../internal/types/actionExtras';
import {ContextItem} from '../../internal/types/data';

export type ResetContextItemsResult = {
    success: true;
} | {
    success: false;
    error: string;
};

export type ResetContextItemsHandler = (
    contextId: string,
    newItems: Record<string, Omit<ContextItem, 'itemId'>> | undefined,
    extras: ActionExtras,
) => Promise<ResetContextItemsResult>;
