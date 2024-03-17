import {RemoveContextTasksHandler} from '../../../interfaces/context/removeTasks';
import {inMemoryContextTasksStore} from './context';

export const removeTasks: RemoveContextTasksHandler = async (
    contextId,
    taskIds,
    extras,
) => {
    const context = inMemoryContextTasksStore[contextId];
    if (!context) {
        return {
            success: false,
            error: 'Context not found',
        };
    }

    for (const taskId of taskIds) {
        delete context[taskId];
    }

    return {
        success: true,
    };
};
