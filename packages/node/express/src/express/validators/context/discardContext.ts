import {PayloadValidator} from '../../types/payloadValidator';

export const isValidPayloadForDiscardContext: PayloadValidator = (payload: any) => {
    if (typeof payload !== 'object' || payload === null) {
        return {
            success: false,
            error: 'Payload must be an object.',
        };
    }

    // A payload is provided:
    // It must only have 1 key: contextId
    if (Object.keys(payload).length !== 1) {
        return {
            success: false,
            error: 'Payload must have exactly one key: contextId.',
        };
    }

    const contextId = payload.contextId;
    if (typeof contextId !== 'string' || !contextId) {
        return {
            success: false,
            error: 'payload.contextId must be a non-empty string.',
        };
    }

    return {
        success: true,
        payload,
    };
};
