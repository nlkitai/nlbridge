import {ContextItem} from '@nlbridge-dev/core/src';

export type ResetContextItemsPayload = {
    contextId: string;
    items?: Record<string, Omit<ContextItem, 'itemId'>>;
};
