import {PayloadValidator} from '../../types/payloadValidator';

export const validPayloadForAssist: PayloadValidator = (
    payload,
) => {
    if (typeof payload !== 'object' || payload === null) {
        return {
            success: false,
            error: 'payload is not an object',
        };
    }

    if (typeof payload.message !== 'string') {
        return {
            success: false,
            error: 'payload.message is not a string',
        };
    }

    return {
        success: true,
        payload,
    };
};
