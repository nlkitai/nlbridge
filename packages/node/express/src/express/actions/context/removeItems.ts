import {RunAction} from '@nlbridge/core';
import {Request, Response} from 'express';
import {defaultExtras, defaultExtrasWithContextId} from '../../defaultExtras';
import {RemoveContextItemsPayload} from '../../types/payloads/context/removeItems';

export const removeItems = async (
    run: RunAction,
    payload: RemoveContextItemsPayload,
    req: Request,
    res: Response,
) => {
    const result = await run(
        'remove-items',
        payload.contextId,
        payload.itemIds,
        defaultExtrasWithContextId(payload.contextId),
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
