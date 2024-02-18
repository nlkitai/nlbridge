import {ActionExtras} from '../../internal/types/actionExtras';

export type ChatStreamObserver = {
    complete(): void;
    error(error: string): void;
    next(value: string): void;
}

export type ChatStreamHandler = (
    prompt: string,
    observer: ChatStreamObserver,
    extras: ActionExtras,
) => void;
