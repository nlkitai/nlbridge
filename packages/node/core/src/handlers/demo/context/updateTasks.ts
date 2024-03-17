import {UpdateContextTasksHandler} from '../../../interfaces/context/updateTasks';
import {inMemoryContextTasksStore} from './context';

export const updateTasks: UpdateContextTasksHandler = async (
    contextId,
    tasks,
    extras,
) => {
    const context = inMemoryContextTasksStore[contextId];
    if (!context) {
        return {
            success: false,
            error: 'Context not found',
        };
    }

    const taskIds = Object.keys(tasks);
    for (const taskId of taskIds) {
        const newValue = tasks[taskId];

        // We do not handle undefined values
        // If you want to remove a value, use the removeTasks method
        if (newValue === undefined) {
            continue;
        }

        context[taskId] = {
            ...context[taskId],
            ...newValue,
            taskId,
        };
    }

    return {
        success: true,
    };
};
