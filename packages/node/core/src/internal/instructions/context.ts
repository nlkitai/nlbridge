import instructions from '../../instructions/context.nl.txt';
import {ContextData} from '../types/context';

export const contextInstruction = (contextData: ContextData) => {
    const serializedContext = JSON.stringify(contextData, null, 2);

    if (typeof instructions === 'string' && instructions) {
        // replace "{}" with the serialized context
        return instructions.replace('{{context}}', '\n\n' + serializedContext + '\n\n');
    }

    return 'Use the the JSON object below as a context for the conversation that you are having with the user:\n\n'
        + serializedContext + '\n\n';
};
