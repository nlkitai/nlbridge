const actionsList = [
    'chat',
    'chat-stream',
    'assist',

    'create-context',
    'discard-context',
    'get-context',

    'reset-context-items',
    'update-context-items',
    'remove-context-items',

    'reset-context-tasks',
    'update-context-tasks',
    'remove-context-tasks',
];

export type ActionId = typeof actionsList[number];

export const actionIds: ActionId[] = actionsList;
