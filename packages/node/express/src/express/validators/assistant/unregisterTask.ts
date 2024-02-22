import {PayloadValidator} from '../../types/payloadValidator';

export const isValidatePayloadForUnregisterTask: PayloadValidator = (payload: any) => {
    if (typeof payload !== 'object' || payload === null) {
        return {
            success: false,
            error: 'Payload must be an object.',
        };
    }

    // A payload is provided:
    // It must only have 1 key: contextId
    if (Object.keys(payload).length !== 2) {
        return {
            success: false,
            error: 'Payload must have exactly 2 keys: contextId, taskId.',
        };
    }

    const contextId = payload.contextId;
    if (typeof contextId !== 'string' || !contextId) {
        return {
            success: false,
            error: 'payload.contextId must be a non-empty string.',
        };
    }

    const taskId = payload.taskId;
    if (typeof taskId !== 'string' || !taskId) {
        return {
            success: false,
            error: 'payload.taskId must be a non-empty string.',
        };
    }

    return {
        success: true,
        payload,
    };
};
