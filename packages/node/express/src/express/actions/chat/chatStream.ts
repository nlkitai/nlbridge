import {ChatStreamObserver, RunAction} from '@nlbridge/core';
import {Request, Response} from 'express';
import {error} from '../../../utils/error';
import {warn} from '../../../utils/warn';

export const chatStream = (run: RunAction, payload: any, req: Request, res: Response) => {
    let connectionEndedByClient = false;

    const observer: ChatStreamObserver = {
        next: (chunk: any) => {
            if (!connectionEndedByClient) {
                if (typeof chunk === 'string' || typeof chunk === 'number') {
                    res.write(chunk);
                } else {
                    warn('Invalid chunk type in chat stream that cannot be sent to the client.');
                }
            }
        },
        complete: () => {
            if (!connectionEndedByClient) {
                res.end();
            }
        },
        error: (err: string) => {
            error(err);
        },
    };

    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // Flush the headers to establish SSE with client

    res.on('close', () => {
        connectionEndedByClient = true;
    });

    run('chat-stream', payload.message, observer, {});
    return;
};
