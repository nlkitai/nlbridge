import {RunAction} from '@nlbridge/core';
import {Request, Response} from 'express';
import {defaultExtras} from '../../defaultExtras';
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
        defaultExtras,
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
