import {ActionExtras} from '../../internal/types/actionExtras';

export type SetContextResult = {
    success: true;
    contextId: string;
} | {
    success: false;
    error: string;
};

export type SetContextHandler = (
    initialData: Record<string, any> | undefined,
    extras: ActionExtras,
) => Promise<SetContextResult>;
