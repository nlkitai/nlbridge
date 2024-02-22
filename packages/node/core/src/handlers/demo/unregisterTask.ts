import {UnregisterTaskHandler} from '../../interfaces/assistant/unregisterTask';
import {ContextTaskData} from '../../internal/types/context';
import {inMemoryTaskContextStore} from './context';

export const unregisterContextTask: UnregisterTaskHandler = async (
    contextId,
    taskId,
    extras,
) => {
    if (!inMemoryTaskContextStore[contextId]) {
        return {
            success: false,
            error: 'Context not found',
        };
    }

    const taskContextData: ContextTaskData | undefined = inMemoryTaskContextStore[contextId];
    if (taskContextData) {
        delete taskContextData[taskId];
    }

    return {
        success: true,
    };
};
