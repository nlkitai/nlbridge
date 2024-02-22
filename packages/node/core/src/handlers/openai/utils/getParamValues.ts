import OpenAI from 'openai';
import {provideContexToLlm} from '../../../internal/instructions/context';
import {getInstructionToExtractParamValues} from '../../../internal/instructions/paramValues';
import {ActionExtras} from '../../../internal/types/actionExtras';
import {ContextData, ContextTask} from '../../../internal/types/context';
import {error} from '../../../utils/error';
import {openAiDefaultChatModel, OpenAiRuntimeConfig} from '../types';

export const getParamValues = async (
    message: string,
    task: ContextTask,
    contextData: ContextData | undefined,
    extras: ActionExtras<OpenAiRuntimeConfig>,
): Promise<any[] | undefined> => {
    if (!contextData) {
        return;
    }

    const systemMessageForTaskParamsValues = getInstructionToExtractParamValues(task);
    if (!systemMessageForTaskParamsValues) {
        return;
    }

    const messagesToSend: Array<OpenAI.Chat.Completions.ChatCompletionMessageParam> = [];
    const systemMessageForContextData = provideContexToLlm(contextData);
    if (systemMessageForContextData) {
        messagesToSend.push({
            role: 'system',
            content: systemMessageForContextData,
        });
    }

    const openai = new OpenAI({
        apiKey: extras.config?.apiKey,
    });

    messagesToSend.push({
        role: 'system',
        content: systemMessageForTaskParamsValues,
    });

    messagesToSend.push({
        role: 'user',
        content: message,
    });

    const chatModel = extras.config?.chatModel || openAiDefaultChatModel;
    const response = await openai.chat.completions.create({
        stream: false,
        model: chatModel,
        messages: messagesToSend,
    });

    if (!(response.choices && response.choices.length > 0 && response.choices[0].message.content)) {
        return;
    }

    const messageContent = response.choices[0].message.content;

    try {
        const paramValues = JSON.parse(messageContent);
        if (Array.isArray(paramValues)) {
            return paramValues;
        } else {
            error('The response is not an array.');
            return undefined;
        }
    } catch (e) {
        error('Error parsing param values: ' + e);
        return undefined;
    }
};