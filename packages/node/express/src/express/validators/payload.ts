import {ActionId} from '@nlbridge/core';
import {validPayloadForAssist} from './chat/assist';
import {validPayloadForChat} from './chat/chat';
import {validatePayloadForChatStream} from './chat/chatStream';
import {validatePayloadForCreateContext} from './context/createContext';
import {isValidPayloadForDiscardContext} from './context/discardContext';
import {validatePayloadForGetContext} from './context/getContext';
import {validatePayloadForRemoveContextItems} from './context/removeContextItems';
import {validatePayloadForRemoveContextTasks} from './context/removeContextTasks';
import {validatePayloadForResetContextItems} from './context/resetContextItems';
import {validatePayloadForResetContextTasks} from './context/resetContextTasks';
import {validatePayloadForUpdateContextItems} from './context/updateContextItems';
import {validatePayloadForUpdateContextTasks} from './context/updateContextTasks';

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
        case 'assist':
            return validPayloadForAssist(payload);

        case 'create-context':
            return validatePayloadForCreateContext(payload);
        case 'get-context':
            return validatePayloadForGetContext(payload);
        case 'discard-context':
            return isValidPayloadForDiscardContext(payload);

        case 'reset-context-items':
            return validatePayloadForResetContextItems(payload);
        case 'update-context-items':
            return validatePayloadForUpdateContextItems(payload);
        case 'remove-context-items':
            return validatePayloadForRemoveContextItems(payload);

        case 'reset-context-tasks':
            return validatePayloadForResetContextTasks(payload);
        case 'update-context-tasks':
            return validatePayloadForUpdateContextTasks(payload);
        case 'remove-context-tasks':
            return validatePayloadForRemoveContextTasks(payload);

        default:
            return {
                success: false,
                error: `The action provided "${actionId}" is not supported.`,
            };
    }
};
