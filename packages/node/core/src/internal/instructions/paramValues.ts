import {ContextTask} from '../types/data';
import {LlmInstructions} from '../types/llmInstructions';

export const getInstructionToExtractParamValues = (
    task: ContextTask,
    llmInstructions: LlmInstructions,
): string | undefined => {
    if (typeof llmInstructions.parameterValues !== 'string' && !llmInstructions.parameterValues) {
        return;
    }

    const naturalLanguageInstructions = llmInstructions.parameterValues;
    const serializedParams = task.paramDescriptions.map((description, index) => {
        return `<Parameter#${index + 1}>`;
    }).join(', ');

    const paramsArrayTemplate = '[' + serializedParams + ']';

    let instructionsToReplaceParams = '';
    task.paramDescriptions.forEach((description, index) => {
        instructionsToReplaceParams += `The value for the parameter <Parameter#${index + 1}> : ${description}\n`;
    });

    return naturalLanguageInstructions
        .replace('{{taskId}}', task.taskId)
        .replace('{{instructionsToReplaceParams}}', instructionsToReplaceParams)
        .replace('{{paramsArrayTemplate}}', paramsArrayTemplate);
};
