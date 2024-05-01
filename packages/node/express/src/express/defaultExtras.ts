import {ActionExtras, OpenAiRuntimeConfig} from '@nlbridge/core';

export const defaultExtras: ActionExtras<OpenAiRuntimeConfig> = {
    getLlmInstructions: () => ({}),
};

export const extrasFromPayload = (payload: any): ActionExtras<OpenAiRuntimeConfig> => ({
    ...defaultExtras,
    contextId: typeof payload.contextId === 'string' ? payload.contextId : undefined,
    conversationHistory: Array.isArray(payload.conversationHistory) ? payload.conversationHistory : undefined,
});
