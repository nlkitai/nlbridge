import {RemoveContextItemsHandler} from '../../../interfaces/context/removeItems';
import {inMemoryContextItemsStore} from './context';

export const removeItems: RemoveContextItemsHandler = async (
    contextId,
    itemIds,
    extras,
) => {
    const context = inMemoryContextItemsStore[contextId];
    if (!context) {
        return {
            success: false,
            error: 'Context not found',
        };
    }

    for (const itemId of itemIds) {
        delete context[itemId];
    }

    return {
        success: true,
    };
};
