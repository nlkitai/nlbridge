import {RegisterTaskHandler} from '../../interfaces/assistant/registerTask';
import {inMemoryDataContextStore, inMemoryTaskContextStore} from './context';

export const registerContextTask: RegisterTaskHandler = async (
    contextId,
    taskId,
    parameters,
    extras,
) => {
    if (!inMemoryDataContextStore[contextId]) {
        return {
            success: false,
            error: 'Context not found',
        };
    }

    inMemoryTaskContextStore[contextId] = {
        ...inMemoryTaskContextStore[contextId],
        [taskId]: {
            taskId,
            parameters,
        },
    };

    return {
        success: true,
    };
};
