import OpenAI from 'openai';
import {ChatHandler} from '../../interfaces/chat/chat';
import {contextInstruction} from '../../internal/instructions/context';
import {ActionExtras} from '../../internal/types/actionExtras';
import {openAiDefaultChatModel, OpenAiRuntimeConfig} from './types';

export const openAiChat: ChatHandler = async (prompt, extras: ActionExtras<OpenAiRuntimeConfig>) => {
    const openai = new OpenAI(); // TODO - make this configurable

    const messagesToSend: Array<
        OpenAI.Chat.Completions.ChatCompletionSystemMessageParam |
        OpenAI.Chat.Completions.ChatCompletionUserMessageParam |
        OpenAI.Chat.Completions.ChatCompletionAssistantMessageParam
    > = [];

    if (extras.getContextData) {
        const contextData = await extras.getContextData();
        if (contextData) {
            messagesToSend.push({
                role: 'system',
                content: contextInstruction(contextData),
            });
        }
    }

    // TODO - Handle history
    // TODO - Handle system messages

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
