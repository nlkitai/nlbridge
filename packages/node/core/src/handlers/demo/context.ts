import {ContextData, ContextTaskData} from '../../internal/types/context';

export const inMemoryDataContextStore: Record<string, ContextData | undefined> = {};
export const inMemoryTaskContextStore: Record<string, ContextTaskData | undefined> = {};
