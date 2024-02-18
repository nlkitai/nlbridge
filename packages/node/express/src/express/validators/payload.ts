import {ActionId} from '@nlbridge/core';
import {validPayloadForChat} from './actions/chat';
import {validatePayloadForChatStream} from './actions/chatStream';
import {isValidPayloadForClearContext} from './context/clearContext';
import {validatePayloadForGetContextData} from './context/getContextData';
import {validatePayloadForSetContext} from './context/setContext';
import {validatePayloadForUpdateContext} from './context/updateContext';

export const validatePayloadForAction = <T>(actionId: ActionId, payload: any): {
    success: false;
    error: string;
} | {
    success: true;
    payload: T;
} => {
    switch (actionId) {
        case 'chat':
            return validPayloadForChat(payload);
        case 'chat-stream':
            return validatePayloadForChatStream(payload);
        case 'set-context':
            return validatePayloadForSetContext(payload);
        case 'update-context':
            return validatePayloadForUpdateContext(payload);
        case 'get-context-data':
            return validatePayloadForGetContextData(payload);
        case 'clear-context':
            return isValidPayloadForClearContext(payload);
        default:
            return {
                success: false,
                error: `The action provided "${actionId}" is not supported.`,
            };
    }
};
