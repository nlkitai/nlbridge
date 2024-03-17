import {ResetContextTasksHandler} from '../../../interfaces/context/resetTasks';
import {inMemoryContextTasksStore} from './context';

export const resetTasks: ResetContextTasksHandler = async (
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

    if (tasks === undefined) {
        inMemoryContextTasksStore[contextId] = {};
        return {
            success: true,
        };
    }

    const taskIds = Object.keys(tasks);
    inMemoryContextTasksStore[contextId] = taskIds.reduce(
        (acc, taskId) => {
            const task = tasks[taskId];
            return {
                ...acc,
                [taskId]: {
                    ...task,
                    taskId,
                },
            };
        },
        {},
    );

    return {
        success: true,
    };
};
