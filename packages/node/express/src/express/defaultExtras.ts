import {ActionExtras, OpenAiRuntimeConfig} from '@nlbridge/core';

export const defaultExtras: ActionExtras<OpenAiRuntimeConfig> = {
    getLlmInstructions: () => ({}),
};

export const defaultExtrasWithContextId = (contextId: string): ActionExtras<OpenAiRuntimeConfig> => ({
    ...defaultExtras,
    contextId,
});
