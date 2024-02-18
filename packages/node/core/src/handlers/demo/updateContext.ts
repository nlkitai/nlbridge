import {UpdateContextHandler} from '../../interfaces/context/update';
import {inMemoryDemoContextStore} from './context';

export const updateContext: UpdateContextHandler = async (
    contextId,
    data,
    extras,
) => {
    if (!inMemoryDemoContextStore[contextId]) {
        return {
            success: false,
            error: 'Context not found',
        };
    }

    inMemoryDemoContextStore[contextId] = {
        ...inMemoryDemoContextStore[contextId],
        ...data,
    };

    return {
        success: true,
    };
};
