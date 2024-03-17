import {DiscardContextHandler} from '../../../interfaces/context/discard';
import {inMemoryContextItemsStore, inMemoryContextTasksStore} from './context';

export const discardContext: DiscardContextHandler = async (
    contextId,
    extras,
) => {
    if (!contextId || !inMemoryContextItemsStore[contextId]) {
        return {
            success: false,
            error: 'Context not found',
        };
    }

    inMemoryContextItemsStore[contextId] = undefined;
    delete inMemoryContextItemsStore[contextId];

    inMemoryContextTasksStore[contextId] = undefined;
    delete inMemoryContextTasksStore[contextId];

    return {
        success: true,
    };
};
