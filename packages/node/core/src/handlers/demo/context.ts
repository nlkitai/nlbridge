import {ContextData} from '../../internal/types/context';

export const inMemoryDemoContextStore: Record<string, {
    [key: string]: ContextData | undefined;
} | undefined> = {};
