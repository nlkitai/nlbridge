const actionsList = [
    'chat',
    'chat-stream',

    'set-context',
    'update-context',
    'clear-context',
    'get-context-data',

    'register-task',
    'unregister-task',
    'assist',

    // TODO - More context actions
    // 'upload-voice-message'
    // 'respond-to-voice-message'
    // 'upload-file'
];

export type ActionId = typeof actionsList[number];

export const actionIds: ActionId[] = actionsList;
