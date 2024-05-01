import {LlmInstructions} from '../internal/types/llmInstructions';
import contextInstructions from './context.nl.txt';
import paramValuesInstructions from './param-values.nl.txt';
import taskNameInstructions from './task-name.nl.txt';

export const getDefaultLlmInstructions = (): LlmInstructions => {
    return {
        context: typeof contextInstructions === 'string' ? contextInstructions : undefined,
        taskName: typeof taskNameInstructions === 'string' ? taskNameInstructions : undefined,
        parameterValues: typeof paramValuesInstructions === 'string' ? paramValuesInstructions : undefined,
    };
};
