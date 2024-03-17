import {ContextItem} from '@nlbridge-dev/core/src';

export type UpdateContextItemsPayload = {
    contextId: string;
    items: Record<string, Omit<ContextItem, 'itemId'>>;
};
