import {ActionExtras} from '../../internal/types/actionExtras';
import {ContextTask} from '../../internal/types/data';

export type ResetContextTasksResult = {
    success: true;
} | {
    success: false;
    error: string;
};

export type ResetContextTasksHandler = (
    contextId: string,
    tasks: Record<string, Omit<ContextTask, 'taskId'>> | undefined,
    extras: ActionExtras,
) => Promise<ResetContextTasksResult>;
