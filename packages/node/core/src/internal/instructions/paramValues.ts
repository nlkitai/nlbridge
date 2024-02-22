import instructions from '../../instructions/param-values.nl.txt';
import {ContextTask} from '../types/context';

export const getInstructionToExtractParamValues = (
    task: ContextTask,
): string | undefined => {
    if (typeof instructions !== 'string' && !instructions) {
        return;
    }

    const naturalLanguageInstructions = instructions as string;
    const serializedParams = task.parameters.map((description, index) => {
        return `<Parameter#${index + 1}>`;
    }).join(', ');

    const paramsArrayTemplate = '[' + serializedParams + ']';

    let instructionsToReplaceParams = '';
    task.parameters.forEach((description, index) => {
        instructionsToReplaceParams += `The value for the parameter <Parameter#${index + 1}> : ${description}\n`;
    });

    return naturalLanguageInstructions
        .replace('{{taskId}}', task.taskId)
        .replace('{{instructionsToReplaceParams}}', instructionsToReplaceParams)
        .replace('{{paramsArrayTemplate}}', paramsArrayTemplate);
};
