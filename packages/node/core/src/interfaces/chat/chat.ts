import {ActionExtras} from '../../internal/types/actionExtras';

export type ChatResult = {
    success: true;
    message: string;
} | {
    success: false;
    error: string;
};

export type ChatHandler = (prompt: string, extras: ActionExtras) => Promise<ChatResult>;
