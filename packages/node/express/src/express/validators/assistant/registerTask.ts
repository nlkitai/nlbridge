import {PayloadValidator} from '../../types/payloadValidator';

export const isValidatePayloadForRegisterTask: PayloadValidator = (payload: any) => {
    if (typeof payload !== 'object' || payload === null) {
        return {
            success: false,
            error: 'Payload must be an object.',
        };
    }

    // A payload is provided:
    // It must only have 1 key: contextId
    if (Object.keys(payload).length !== 3) {
        return {
            success: false,
            error: 'Payload must have exactly 3 keys: contextId, taskId, and parameters.',
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

    const parametersDescription = payload.parameters;
    if (
        !Array.isArray(parametersDescription)
        || (parametersDescription as string[]).some((x: any) => typeof x !== 'string' || !x)
    ) {
        return {
            success: false,
            error: 'payload.parameters must be an array of non-empty strings.',
        };
    }

    return {
        success: true,
        payload,
    };
};
