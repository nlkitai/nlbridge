import OpenAI from 'openai';
import process from 'process';
import {ChatHandler} from '../../interfaces/chat/chat';
import {provideContextToLlm} from '../../internal/instructions/context';
import {ActionExtras} from '../../internal/types/actionExtras';
import {openAiDefaultChatModel, OpenAiRuntimeConfig} from './types';

export const openAiChat: ChatHandler = async (
    prompt,
    extras: ActionExtras<OpenAiRuntimeConfig>,
) => {
    const openai = new OpenAI({
        apiKey: extras.config?.apiKey || process.env.OPENAI_API_KEY || '',
    });

    const messagesToSend: Array<
        OpenAI.Chat.Completions.ChatCompletionSystemMessageParam |
        OpenAI.Chat.Completions.ChatCompletionUserMessageParam |
        OpenAI.Chat.Completions.ChatCompletionAssistantMessageParam
    > = [];

    if (extras.getContextItems) {
        const llmInstructions = extras.getLlmInstructions();
        const contextData = await extras.getContextItems();
        if (contextData) {
            messagesToSend.push({
                role: 'system',
                content: provideContextToLlm(contextData, llmInstructions),
            });
        }
    }

    if (extras.conversationHistory) {
        extras.conversationHistory.forEach((item) => {
            messagesToSend.push({
                role: item.role === 'ai' ? 'assistant' : (item.role === 'system' ? 'system' : 'user'),
                content: item.message,
            });
        });
    }

    messagesToSend.push({
        role: 'user',
        content: prompt,
    });

    const response = await openai.chat.completions.create({
        stream: false,
        model: extras.config?.chatModel || openAiDefaultChatModel,
        messages: messagesToSend,
    });

    if (!response.choices || response.choices.length === 0 || !response.choices[0].message.content) {
        return {
            success: false,
            error: 'No response from OpenAI.',
        };
    }

    return {
        success: true,
        message: response.choices[0].message.content,
    };
};
