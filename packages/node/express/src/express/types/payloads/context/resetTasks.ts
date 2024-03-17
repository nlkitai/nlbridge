import {ContextTask} from '@nlbridge/core';

export type ResetContextTasksPayload = {
    contextId: string;
    tasks?: Record<string, Omit<ContextTask, 'taskId'>>;
};
