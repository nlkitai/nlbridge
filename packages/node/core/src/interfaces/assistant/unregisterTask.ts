import {ActionExtras} from '../../internal/types/actionExtras';

export type UnregisterTaskResult = {
    success: true;
} | {
    success: false;
    error: string;
};

export type UnregisterTaskHandler = (
    contextId: string,
    taskId: string,
    extras: ActionExtras,
) => Promise<UnregisterTaskResult>;
