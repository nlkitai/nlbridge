import {PayloadValidator} from '../../types/payloadValidator';
import {isValidConversationHistory} from './isValidConversationHistory';

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

    if (payload.conversationHistory) {
        const historyValidation = isValidConversationHistory(payload.conversationHistory);
        if (!historyValidation.success) {
            return {
                success: false,
                error: historyValidation.error ?? 'payload.conversationHistory is invalid',
            };
        }
    }

    return {
        success: true,
        payload,
    };
};
