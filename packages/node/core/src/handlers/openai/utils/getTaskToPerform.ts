import OpenAI from 'openai';
import {provideContexToLlm} from '../../../internal/instructions/context';
import {getInstructionToExtractTaskName} from '../../../internal/instructions/taskName';
import {ActionExtras} from '../../../internal/types/actionExtras';
import {ContextData, ContextTask} from '../../../internal/types/context';
import {openAiDefaultChatModel, OpenAiRuntimeConfig} from '../types';
import {isValidTaskName} from './isValidTaskName';

export const getTaskToPerform = async (
    message: string,
    contextData: ContextData | undefined,
    extras: ActionExtras<OpenAiRuntimeConfig>,
): Promise<ContextTask | undefined> => {
    if (!contextData) {
        return;
    }

    if (!extras.getTasksData) {
        return;
    }

    const tasksData = await extras.getTasksData();
    if (!tasksData) {
        return;
    }

    const chatModel = extras.config?.chatModel || openAiDefaultChatModel;
    const systemMessageForContextData = provideContexToLlm(contextData);
    const systemMessageToExtractInstruction = getInstructionToExtractTaskName(tasksData);
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
    if (!task.parameters || task.parameters.length === 0) {
        return {
            taskId: taskName,
            parameters: [],
        };
    }

    return {
        taskId: taskName,
        parameters: task.parameters,
    };
};
