import {ResetContextItemsHandler} from '../../../interfaces/context/resetItems';
import {inMemoryContextItemsStore} from './context';

export const resetItems: ResetContextItemsHandler = async (
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

    if (!items) {
        inMemoryContextItemsStore[contextId] = {};
        return {
            success: true,
        };
    }

    const itemIds = Object.keys(items);
    inMemoryContextItemsStore[contextId] = itemIds.reduce(
        (acc, itemId) => {
            const item = items[itemId];
            return {
                ...acc,
                [itemId]: {
                    ...item,
                    itemId,
                },
            };
        },
        {},
    );

    return {
        success: true,
    };
};
