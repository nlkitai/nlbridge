import {CreateContextHandler} from '../../../interfaces/context/create';
import {ContextItems} from '../../../internal/types/data';
import {inMemoryContextItemsStore, inMemoryContextTasksStore} from './context';

export const createContext: CreateContextHandler = async (
    items,
    extras,
) => {
    //
    // Generate a unique context ID
    //
    let newContextId: string | undefined = undefined;
    do {
        newContextId = Math.random().toString(36).substring(2, 14);
        if (inMemoryContextItemsStore[newContextId]) {
            newContextId = '';
        }
    }
    while (!newContextId);

    inMemoryContextTasksStore[newContextId] = {};

    //
    // Set data for the new context
    //
    if (items === undefined) {
        inMemoryContextItemsStore[newContextId] = {};

        return {
            success: true,
            contextId: newContextId,
        };
    }

    const newItemIds = Object.keys(items);
    inMemoryContextItemsStore[newContextId] = newItemIds.reduce<ContextItems>(
        (acc, itemId) => {
            acc[itemId] = {
                itemId,
                ...(items[itemId]),
            };

            return acc;
        },
        {},
    );

    return {
        success: true,
        contextId: newContextId,
    };
};
