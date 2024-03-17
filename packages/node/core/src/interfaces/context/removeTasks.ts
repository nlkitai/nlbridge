import {ActionExtras} from '../../internal/types/actionExtras';

export type RemoveContextTasksResult = {
    success: true;
} | {
    success: false;
    error: string;
};

export type RemoveContextTasksHandler = (
    contextId: string,
    taskIds: string[],
    extras: ActionExtras,
) => Promise<RemoveContextTasksResult>;
