import {PayloadValidator} from '../../types/payloadValidator';

export const validatePayloadForCreateContext: PayloadValidator = (
    payload,
) => {
    if (payload === undefined || payload === null) {
        // Payload is optional when setting context.
        // When it is not provided, we create an empty context.
        return {
            success: true,
            payload: null,
        };
    }

    // A payload is provided.
    // It must only have 1 key: data

    if (typeof payload !== 'object' || !payload || Object.keys(payload).length > 1) {
        // When provided, payload must be an object with exactly one key.
        return {
            success: false,
            error: 'Payload can only have one optional key: items.',
        };
    }

    // One key is provided
    // It must be a valid data object

    const items = payload.items;
    if (typeof items !== 'object' || !items) {
        // When provided, data must be an object or null.
        return {
            success: false,
            error: 'Payload.items must be a valid object.',
        };
    }

    return {
        success: true,
        payload,
    };
};
