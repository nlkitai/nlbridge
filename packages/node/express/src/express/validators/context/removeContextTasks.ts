import {PayloadValidator} from '../../types/payloadValidator';

export const validatePayloadForRemoveContextTasks: PayloadValidator = (payload: any) => {
    if (typeof payload !== 'object' || payload === null) {
        // Payload is required when updating context.
        return {
            success: false,
            error: 'Payload must be an object.',
        };
    }

    if (Object.keys(payload).length !== 2) {
        // Payload must have exactly two keys: contextId and data.
        return {
            success: false,
            error: 'Payload must have exactly two keys: contextId and taskIds.',
        };
    }

    const contextId = payload.contextId;
    if (typeof contextId !== 'string' || !contextId) {
        // Context ID is required when updating context.
        return {
            success: false,
            error: 'Payload.contextId must be a non-empty string.',
        };
    }

    const taskIds = payload.taskIds;
    if (!Array.isArray(taskIds)) {
        return {
            success: false,
            error: 'Payload.taskIds must be an array.',
        };
    }

    const allItemIdsAreStrings = taskIds.every((itemId) => typeof itemId === 'string');
    if (!allItemIdsAreStrings) {
        return {
            success: false,
            error: 'All taskIds must be strings.',
        };
    }

    return {
        success: true,
        payload,
    };
};
