import {RunAction} from '@nlbridge/core';
import {Request, Response} from 'express';
import {ResetContextItemsPayload} from '../../types/payloads/context/resetItems';

export const resetItems = async (
    run: RunAction,
    payload: ResetContextItemsPayload,
    req: Request,
    res: Response,
) => {
    const result = await run(
        'reset-items',
        payload.contextId,
        payload.items,
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
    });
};
