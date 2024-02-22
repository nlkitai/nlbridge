import {UpdateContextHandler} from '../../interfaces/context/update';
import {inMemoryDataContextStore} from './context';

export const updateContext: UpdateContextHandler = async (
    contextId,
    data,
    extras,
) => {
    if (!inMemoryDataContextStore[contextId]) {
        return {
            success: false,
            error: 'Context not found',
        };
    }

    inMemoryDataContextStore[contextId] = {
        ...inMemoryDataContextStore[contextId],
        ...data,
    };

    return {
        success: true,
    };
};
