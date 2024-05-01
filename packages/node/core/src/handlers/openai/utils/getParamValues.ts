import OpenAI from 'openai';
import {provideContextToLlm} from '../../../internal/instructions/context';
import {getInstructionToExtractParamValues} from '../../../internal/instructions/paramValues';
import {ActionExtras} from '../../../internal/types/actionExtras';
import {ContextItems, ContextTask} from '../../../internal/types/data';
import {LlmInstructions} from '../../../internal/types/llmInstructions';
import {error} from '../../../utils/error';
import {openAiDefaultChatModel, OpenAiRuntimeConfig} from '../types';

export const getParamValues = async (
    message: string,
    task: ContextTask,
    contextData: ContextItems | undefined,
    extras: ActionExtras<OpenAiRuntimeConfig>,
): Promise<any[] | undefined> => {
    if (!contextData) {
        return;
    }

    const llmInstructions = extras.getLlmInstructions();
    const systemMessageForTaskParamsValues = getInstructionToExtractParamValues(task, llmInstructions);
    if (!systemMessageForTaskParamsValues) {
        return;
    }

    const messagesToSend: Array<OpenAI.Chat.Completions.ChatCompletionMessageParam> = [];
    const systemMessageForContextData = provideContextToLlm(contextData, llmInstructions);
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
