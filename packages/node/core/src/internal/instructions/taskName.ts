import {ContextTasks} from '../types/data';
import {LlmInstructions} from '../types/llmInstructions';

export const getInstructionToExtractTaskName = (
    tasksData: ContextTasks,
    llmInstructions: LlmInstructions,
) => {
    const serializedTasksData = JSON.stringify(tasksData, null, 2);

    if (typeof llmInstructions.taskName !== 'string' && !llmInstructions.taskName) {
        return;
    }

    const naturalLanguageInstructions = llmInstructions.taskName;
    return naturalLanguageInstructions
        .replace('{{tasks}}', '\n\n' + serializedTasksData + '\n\n');
};
