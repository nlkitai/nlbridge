import {SetContextHandler} from '../../interfaces/context/set';
import {inMemoryDemoContextStore} from './context';

export const setContext: SetContextHandler = async (
    initialData,
    extras,
) => {
    //
    // Generate a unique context ID
    //
    let newContextId: string | undefined = undefined;
    do {
        newContextId = Math.random().toString(36).substring(2, 14);
        if (inMemoryDemoContextStore[newContextId]) {
            newContextId = '';
        }
    }
    while (!newContextId);

    //
    // Set data for the new context
    //
    inMemoryDemoContextStore[newContextId] = {
        ...initialData,
    };

    return {
        success: true,
        contextId: newContextId,
    };
};
