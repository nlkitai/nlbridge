import {PayloadValidator} from '../../types/payloadValidator';

export const validatePayloadForGetContext: PayloadValidator = (payload: any) => {
    if (typeof payload !== 'object' || payload === null) {
        return {
            success: false,
            error: 'Payload must be an object.',
        };
    }

    const keysLength = Object.keys(payload).length;
    if (keysLength !== 1 && keysLength !== 2) {
        return {
            success: false,
            error: 'Payload must have exactly one or two keys: contextId and key.',
        };
    }

    const contextId = payload.contextId;
    if (typeof contextId !== 'string' || !contextId) {
        return {
            success: false,
            error: 'payload.contextId must be a non-empty string.',
        };
    }

    if (keysLength === 1) {
        return {
            success: true,
            payload,
        };
    }

    const itemKey = payload.key;
    if (typeof itemKey !== 'string' || !itemKey) {
        return {
            success: false,
            error: 'payload.key must be a non-empty string.',
        };
    }

    return {
        success: true,
        payload,
    };
};
