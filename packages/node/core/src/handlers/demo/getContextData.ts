import {GetContextDataHandler} from '../../interfaces/context/get';
import {inMemoryDemoContextStore} from './context';

export const getContextData: GetContextDataHandler = async (
    contextId,
    itemId,
    extras,
) => {
    if (!contextId || !inMemoryDemoContextStore[contextId]) {
        return {
            success: false,
            error: 'Context not found',
        };
    }

    const context = inMemoryDemoContextStore[contextId]!;
    if (!itemId) {
        return {
            success: true,
            data: context,
        };
    }

    if (!context[itemId]) {
        return {
            success: false,
            error: 'Item not found',
        };
    }

    return {
        success: true,
        data: context[itemId],
    };
};
