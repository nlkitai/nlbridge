export const supportedOpenAiChatModels = [
    "gpt-4",
    "gpt-4-turbo",
    "gpt-4o",
    "gpt-4o-mini",
    "gpt-3.5-turbo",
];

export type OpenAiChatModel = typeof supportedOpenAiChatModels[number];

export const openAiDefaultChatModel: OpenAiChatModel = 'gpt-4o';

export const asOpenAiChatModel = (value: any): OpenAiChatModel | undefined => {
    if (supportedOpenAiChatModels.includes(value)) {
        return value;
    }

    return undefined;
};

export type OpenAiRuntimeConfig = {
    apiKey?: string;
    chatModel?: OpenAiChatModel;
};
