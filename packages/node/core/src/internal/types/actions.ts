const actionsList = [
    'chat',
    'chat-stream',

    'set-context',
    'update-context',
    'clear-context',
    'get-context-data',

    // TODO - Add more actions
    // 'remove-context'
    // 'upload-voice-message'
    // 'respond-to-voice-message'
    // 'upload-file'
];

export type ActionId = typeof actionsList[number];

export const actionIds: ActionId[] = actionsList;
