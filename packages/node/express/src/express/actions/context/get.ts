import {RunAction} from '@nlbridge/core';
import {Request, Response} from 'express';
import {GetContextPayload} from '../../types/payloads/context/get';

export const getContext = async (
    run: RunAction,
    payload: GetContextPayload,
    req: Request,
    res: Response,
) => {
    const result = await run(
        'get-context',
        payload.contextId,
        payload.itemId,
        payload.itemId ? 'task' : undefined,
        {},
    );

    if (!result.success) {
        res.status(500).send({
            success: false,
            error: result.error,
        });
        return;
    }

    res.status(200).send({
        success: true,
        result: {
            items: result.items,
            tasks: result.tasks,
        },
    });
};
