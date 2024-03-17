import {ContextItem} from '../../internal/types/data';

export type CreateContextResult = {
    success: true;
    contextId: string;
} | {
    success: false;
    error: string;
};

export type CreateContextHandler = (
    items?: Record<string, Omit<ContextItem, 'itemId'>>,
    config?: Record<string, any>,
) => Promise<CreateContextResult>;
