import {ClearContextHandler} from '../../interfaces/context/clear';
import {inMemoryDemoContextStore} from './context';

export const clearContext: ClearContextHandler = async (
    contextId,
    extras,
) => {
    if (!contextId || !inMemoryDemoContextStore[contextId]) {
        return {
            success: false,
            error: 'Context not found',
        };
    }

    inMemoryDemoContextStore[contextId] = undefined;
    delete inMemoryDemoContextStore[contextId];

    return {
        success: true,
    };
};
