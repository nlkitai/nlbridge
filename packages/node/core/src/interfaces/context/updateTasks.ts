import {ActionExtras} from '../../internal/types/actionExtras';
import {ContextTask} from '../../internal/types/data';

export type UpdateContextTasksResult = {
    success: true;
} | {
    success: false;
    error: string;
};

export type UpdateContextTasksHandler = (
    contextId: string,
    tasks: Record<string, Omit<ContextTask, 'taskId'>>,
    extras: ActionExtras,
) => Promise<UpdateContextTasksResult>;
