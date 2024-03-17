import {ActionExtras} from '../../internal/types/actionExtras';

export type RemoveContextItemsResult = {
    success: true;
} | {
    success: false;
    error: string;
};

export type RemoveContextItemsHandler = (
    contextId: string,
    itemIds: string[],
    extras: ActionExtras,
) => Promise<RemoveContextItemsResult>;
