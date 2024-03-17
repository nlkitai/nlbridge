import {RunAction} from '@nlbridge/core';
import {Request, Response} from 'express';
import {CreateContextPayload} from '../../types/payloads/context/create';

export const createContext = async (
    run: RunAction,
    payload: CreateContextPayload,
    req: Request,
    res: Response,
) => {
    const result = await run(
        'create-context',
        payload?.items,
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
            contextId: result.contextId,
        },
    });
};
