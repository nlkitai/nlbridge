import {ActionExtras} from '../../internal/types/actionExtras';
import {ContextData} from '../../internal/types/context';

export type GetContextDataResult = {
    success: true;
    data: ContextData | undefined;
} | {
    success: false;
    error: string;
};

export type GetContextDataHandler = (
    contextId: string,
    itemId: string | undefined,
    extras: ActionExtras,
) => Promise<GetContextDataResult>;
