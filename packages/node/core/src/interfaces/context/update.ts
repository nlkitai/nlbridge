import {ActionExtras} from '../../internal/types/actionExtras';
import {ContextData} from '../../internal/types/context';

export type UpdateContextResult = {
    success: true;
} | {
    success: false;
    error: string;
};

export type UpdateContextHandler = (
    contextId: string,
    data: ContextData,
    extras: ActionExtras,
) => Promise<UpdateContextResult>;
