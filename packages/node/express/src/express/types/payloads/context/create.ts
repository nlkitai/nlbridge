import {ContextItem} from '@nlbridge-dev/core/src';

export type CreateContextPayload = {
    items?: Record<string, Omit<ContextItem, 'itemId'>>;
} | undefined;
