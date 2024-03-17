import OpenAI from 'openai';
import process from 'process';
import {ChatStreamHandler} from '../../interfaces/chat/chatStream';
import {provideContexToLlm} from '../../internal/instructions/context';
import {ActionExtras} from '../../internal/types/actionExtras';
import {warn} from '../../internal/utils/warn';
import {openAiDefaultChatModel, OpenAiRuntimeConfig} from './types';

export const openAiChatStream: ChatStreamHandler = async (
    prompt,
    observer,
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
        const contextData = await extras.getContextItems();
        if (contextData) {
            messagesToSend.push({
                role: 'system',
                content: provideContexToLlm(contextData),
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

    try {
        const response = await openai.chat.completions.create({
            stream: true,
            model: extras.config?.chatModel || openAiDefaultChatModel,
            messages: messagesToSend,
        });

        let it = response[Symbol.asyncIterator]();
        let result = await it.next();

        while (!result.done) {
            const value = result.value;
            const finishReason = value.choices?.length > 0 ? value.choices[0].finish_reason : undefined;
            if (finishReason === 'stop') {
                break;
            }

            const message = value.choices?.[0].delta.content;
            if (typeof message === 'string') {
                observer.next(message);
            } else {
                warn(`Undecodable message - value: ${value}`);
            }

            result = await it.next();
        }

        observer.complete();

    } catch (err) {
        warn(`Error: ${err}`);
    }
};
