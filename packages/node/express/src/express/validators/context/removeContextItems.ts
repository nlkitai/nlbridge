import {PayloadValidator} from '../../types/payloadValidator';

export const validatePayloadForRemoveContextItems: PayloadValidator = (payload: any) => {
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
            error: 'Payload must have exactly two keys: contextId and itemIds.',
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

    const itemIds = payload.itemIds;
    if (!Array.isArray(itemIds)) {
        return {
            success: false,
            error: 'Payload.itemIds must be an array.',
        };
    }

    const allItemIdsAreStrings = itemIds.every((itemId) => typeof itemId === 'string');
    if (!allItemIdsAreStrings) {
        return {
            success: false,
            error: 'All itemIds must be strings.',
        };
    }

    return {
        success: true,
        payload,
    };
};
