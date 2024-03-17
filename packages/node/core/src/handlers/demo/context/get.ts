import {GetContextHandler, GetContextResult} from '../../../interfaces/context/get';
import {inMemoryContextItemsStore, inMemoryContextTasksStore} from './context';

export const getContext: GetContextHandler = async (
    contextId,
    itemOrTaskId,
    type,
    extras,
): Promise<GetContextResult> => {
    if (!contextId || !inMemoryContextItemsStore[contextId]) {
        return {
            success: false,
            error: 'Context not found',
        };
    }

    const dataContext = inMemoryContextItemsStore[contextId];
    const taskContext = inMemoryContextTasksStore[contextId];
    if (!itemOrTaskId) {
        return {
            success: true,
            items: dataContext,
            tasks: taskContext,
        };
    }

    if ((!dataContext || !dataContext[itemOrTaskId]) && (!taskContext || !taskContext[itemOrTaskId])) {
        return {
            success: false,
            error: 'Item not found',
        };
    }

    return {
        success: true,
        items: (dataContext && dataContext[itemOrTaskId]) ? ({
            [itemOrTaskId]: dataContext[itemOrTaskId]!,
        }) : undefined,
        tasks: (taskContext && taskContext[itemOrTaskId]) ? ({
            [itemOrTaskId]: taskContext[itemOrTaskId]!,
        }) : undefined,
    };
};
