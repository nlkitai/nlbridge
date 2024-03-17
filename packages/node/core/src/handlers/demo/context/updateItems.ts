import {UpdateContextItemsHandler} from '../../../interfaces/context/updateItems';
import {inMemoryContextItemsStore} from './context';

export const updateItems: UpdateContextItemsHandler = async (
    contextId,
    items,
    extras,
) => {
    const context = inMemoryContextItemsStore[contextId];
    if (!context) {
        return {
            success: false,
            error: 'Context not found',
        };
    }

    const updatingItemIds = Object.keys(items);
    for (const itemId of updatingItemIds) {
        const newValue = items[itemId];

        // We do not handle undefined values
        // If you want to remove a value, use the removeItems method
        if (newValue === undefined) {
            continue;
        }

        context[itemId] = {
            ...context[itemId],
            ...newValue,
            itemId,
        };
    }

    return {
        success: true,
    };
};
