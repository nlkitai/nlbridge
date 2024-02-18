import {ActionExtras} from '../../internal/types/actionExtras';

export type ClearContextResult = {
    success: true;
} | {
    success: false;
    error: string;
};

export type ClearContextHandler = (contextId: string, extras: ActionExtras) => Promise<ClearContextResult>;
