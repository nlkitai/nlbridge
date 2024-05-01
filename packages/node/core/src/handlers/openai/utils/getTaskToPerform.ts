import OpenAI from 'openai';
import {provideContextToLlm} from '../../../internal/instructions/context';
import {getInstructionToExtractTaskName} from '../../../internal/instructions/taskName';
import {ActionExtras} from '../../../internal/types/actionExtras';
import {ContextItems, ContextTask} from '../../../internal/types/data';
import {LlmInstructions} from '../../../internal/types/llmInstructions';
import {openAiDefaultChatModel, OpenAiRuntimeConfig} from '../types';
import {isValidTaskName} from './isValidTaskName';

export const getTaskToPerform = async (
    message: string,
    llmInstructions: LlmInstructions,
    contextData: ContextItems | undefined,
    extras: ActionExtras<OpenAiRuntimeConfig>,
): Promise<ContextTask | undefined> => {
    if (!contextData) {
        return;
    }

    if (!extras.getContextTasks) {
        return;
    }

    const tasksData = await extras.getContextTasks();
    if (!tasksData) {
        return;
    }

    const chatModel = extras.config?.chatModel || openAiDefaultChatModel;
    const systemMessageForContextData = provideContextToLlm(contextData, llmInstructions);
    const systemMessageToExtractInstruction = getInstructionToExtractTaskName(tasksData, llmInstructions);
    if (!systemMessageToExtractInstruction || !systemMessageForContextData) {
        return;
    }

    const messagesToSend: Array<OpenAI.Chat.Completions.ChatCompletionMessageParam> = [];
    const openai = new OpenAI({
        apiKey: extras.config?.apiKey,
    });

    messagesToSend.push({
        role: 'system',
        content: systemMessageForContextData,
    });

    messagesToSend.push({
        role: 'system',
        content: systemMessageToExtractInstruction,
    });

    messagesToSend.push({
        role: 'user',
        content: message,
    });

    const response = await openai.chat.completions.create({
        stream: false,
        model: chatModel,
        messages: messagesToSend,
    });

    if (!(response.choices && response.choices.length > 0 && response.choices[0].message.content)) {
        return;
    }

    const responseContent = response.choices[0].message.content;
    if (responseContent.length < 'task#'.length) {
        return;
    }

    // Strip quotes
    const responseContentClean = responseContent.replace(/['"]/g, '');
    if (['response#', '"response#"', `'response#'`].some(
        (prefix) => responseContentClean.toLowerCase().startsWith(prefix),
    )) {
        return;
    }

    if (['task#', '"task#"', `'task#'`].every(
        (prefix) => !responseContentClean.toLowerCase().startsWith(prefix),
    )) {
        return;
    }

    const taskName = responseContent.substring('task#'.length).trim();
    if (!isValidTaskName(taskName)) {
        return;
    }

    if (!tasksData[taskName]) {
        return;
    }

    const task = tasksData[taskName];
    const paramDescriptions = (!task.paramDescriptions || task.paramDescriptions.length === 0)
        ? []
        : task.paramDescriptions;

    return {
        taskId: taskName,
        description: task.description,
        paramDescriptions,
    };
};
