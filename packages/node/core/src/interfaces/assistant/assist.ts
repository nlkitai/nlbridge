import {ActionExtras} from '../../internal/types/actionExtras';

export type AssistResult = {
    success: true;
    message: string;
    task?: {
        id: string;
        parameters: any[];
    };
} | {
    success: false;
    error: string;
};

export type AssistHandler = (prompt: string, extras: ActionExtras) => Promise<AssistResult>;
