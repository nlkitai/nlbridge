import instructions from '../../instructions/task-name.nl.txt';
import {ContextTaskData} from '../types/context';

export const getInstructionToExtractTaskName = (tasksData: ContextTaskData) => {
    const serializedTasksData = JSON.stringify(tasksData, null, 2);

    if (typeof instructions !== 'string' && !instructions) {
        return;
    }

    const naturalLanguageInstructions = instructions as string;
    return naturalLanguageInstructions
        .replace('{{tasks}}', '\n\n' + serializedTasksData + '\n\n');
};
