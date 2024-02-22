import {ClearContextHandler} from '../../interfaces/context/clear';
import {inMemoryDataContextStore} from './context';

export const clearContext: ClearContextHandler = async (
    contextId,
    extras,
) => {
    if (!contextId || !inMemoryDataContextStore[contextId]) {
        return {
            success: false,
            error: 'Context not found',
        };
    }

    inMemoryDataContextStore[contextId] = undefined;
    delete inMemoryDataContextStore[contextId];

    return {
        success: true,
    };
};
