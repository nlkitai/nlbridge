import { LlmInstructions } from '@nlbridge/core';

export type MiddlewareConfig = {
    apiKey?: string;
    chatModel?: string;
    llmInstructions?: LlmInstructions;
};
