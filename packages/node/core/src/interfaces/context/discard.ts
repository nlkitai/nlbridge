import {ActionExtras} from '../../internal/types/actionExtras';

export type DiscardContextResult = {
    success: true;
} | {
    success: false;
    error: string;
};

export type DiscardContextHandler = (contextId: string, extras: ActionExtras) => Promise<DiscardContextResult>;
