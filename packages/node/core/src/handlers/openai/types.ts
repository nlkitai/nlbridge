export const supportedOpenAiChatModels = [
    'gpt-4-0125-preview',
    'gpt-4-turbo-preview',
    'gpt-4-1106-preview',
    'gpt-4-vision-preview',
    'gpt-4',
    'gpt-4-0314',
    'gpt-4-0613',
    'gpt-4-32k',
    'gpt-4-32k-0314',
    'gpt-4-32k-0613',
    'gpt-3.5-turbo',
    'gpt-3.5-turbo-16k',
    'gpt-3.5-turbo-0301',
    'gpt-3.5-turbo-0613',
    'gpt-3.5-turbo-1106',
    'gpt-3.5-turbo-0125',
    'gpt-3.5-turbo-16k-0613',
];

export type OpenAiChatModel = typeof supportedOpenAiChatModels[number];

export const openAiDefaultChatModel: OpenAiChatModel = 'gpt-3.5-turbo';

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
