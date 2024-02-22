import {ActionExtras} from '../../internal/types/actionExtras';

export type RegisterTaskResult = {
    success: true;
} | {
    success: false;
    error: string;
};

export type RegisterTaskHandler = (
    contextId: string,
    taskId: string,
    parametersDescription: string[],
    extras: ActionExtras,
) => Promise<RegisterTaskResult>;
