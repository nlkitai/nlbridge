import OpenAI from 'openai';
import * as process from 'process';
import {ChatHandler} from '../../interfaces/chat/chat';
import {provideContextToLlm} from '../../internal/instructions/context';
import {ActionExtras} from '../../internal/types/actionExtras';
import {LlmInstructions} from '../../internal/types/llmInstructions';
import {openAiDefaultChatModel, OpenAiRuntimeConfig} from './types';
import {getParamValues} from './utils/getParamValues';
import {getTaskToPerform} from './utils/getTaskToPerform';

export const openAiAssist: ChatHandler = async (
    prompt,
    extras: ActionExtras<OpenAiRuntimeConfig>,
) => {
    const llmInstructions: LlmInstructions = extras.getLlmInstructions();
    const contextData = extras.getContextItems ? await extras.getContextItems() : undefined;
    const task = await getTaskToPerform(prompt, contextData, extras);
    const paramValues = task ? await getParamValues(prompt, task, contextData, extras) : undefined;

    const openai = new OpenAI({
        apiKey: extras.config?.apiKey || process.env.OPENAI_API_KEY || '',
    });

    const messagesToSend: Array<OpenAI.Chat.Completions.ChatCompletionMessageParam> = [];
    if (contextData) {
        const systemMessageForContextData = provideContextToLlm(contextData, llmInstructions);
        if (systemMessageForContextData) {
            messagesToSend.push({
                role: 'system',
                content: systemMessageForContextData,
            });
        }
    }

    if (task && paramValues) {
        messagesToSend.push({
            role: 'system',
            content: `Following the next message, the task "${task.taskId}" will be performed. ` +
                `Respond with a short message based on the user prompt. Your response should be related to the task ` +
                `and should be brief. Do not overload the response with too much information since a task is going ` +
                `to be performed.`,
        });
    }

    extras.conversationHistory?.forEach((item) => {
        messagesToSend.push({
            role: item.role === 'ai' ? 'assistant' : (item.role === 'system' ? 'system' : 'user'),
            content: item.message,
        });
    });

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

    const chatResponse = response.choices[0].message.content;
    if (task && paramValues) {
        return {
            success: true,
            message: chatResponse,
            task: {
                taskId: task.taskId,
                parameters: paramValues,
            },
        };
    }

    return {
        success: true,
        message: chatResponse,
    };
};
