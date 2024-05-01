import {ContextItems} from '../types/data';
import {LlmInstructions} from '../types/llmInstructions';

export const provideContextToLlm = (
    contextData: ContextItems | undefined,
    llmInstructions: LlmInstructions
) => {
    const serializedContext = JSON.stringify(contextData, null, 2);

    if (typeof llmInstructions.context === 'string' && llmInstructions.context.length > 0) {
        // replace "{}" with the serialized context
        return llmInstructions.context.replace('{{context}}', '\n\n' + serializedContext + '\n\n');
    }

    return 'Use the the JSON object below as a context for the conversation that you are having with the user:\n\n'
        + serializedContext + '\n\n';
};
