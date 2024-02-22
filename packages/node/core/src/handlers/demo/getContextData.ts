import {GetContextDataHandler} from '../../interfaces/context/get';
import {inMemoryDataContextStore, inMemoryTaskContextStore} from './context';

export const getContextData: GetContextDataHandler = async (
    contextId,
    itemId,
    extras,
) => {
    if (!contextId || !inMemoryDataContextStore[contextId]) {
        return {
            success: false,
            error: 'Context not found',
        };
    }

    const dataContext = inMemoryDataContextStore[contextId];
    const taskContext = inMemoryTaskContextStore[contextId];
    if (!itemId) {
        return {
            success: true,
            data: dataContext,
            tasks: taskContext,
        };
    }

    if ((!dataContext || !dataContext[itemId]) && (!taskContext || !taskContext[itemId])) {
        return {
            success: false,
            error: 'Item not found',
        };
    }

    return {
        success: true,
        data: (dataContext && dataContext[itemId]) ? dataContext[itemId] : undefined,
        tasks: (taskContext && taskContext[itemId]) ? ({
            [itemId]: taskContext[itemId]!,
        }) : undefined,
    };
};
