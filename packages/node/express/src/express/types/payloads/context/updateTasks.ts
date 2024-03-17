import {ContextTask} from '@nlbridge-dev/core/src';

export type UpdateContextTasksPayload = {
    contextId: string;
    tasks: Record<string, Omit<ContextTask, 'taskId'>>;
};
