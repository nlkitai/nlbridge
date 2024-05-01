import {RunAction} from '@nlbridge/core';
import {Request, Response} from 'express';
import {defaultExtras, extrasFromPayload} from '../../defaultExtras';
import {UpdateContextItemsPayload} from '../../types/payloads/context/updateItems';

export const updateItems = async (
    run: RunAction,
    payload: UpdateContextItemsPayload,
    req: Request,
    res: Response,
) => {
    const result = await run(
        'update-items',
        payload.contextId,
        payload.items,
        extrasFromPayload(payload),
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
