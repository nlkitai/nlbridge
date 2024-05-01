import {RunAction} from '@nlbridge/core';
import {Request, Response} from 'express';
import {defaultExtras, defaultExtrasWithContextId} from '../../defaultExtras';
import {DiscardContextPayload} from '../../types/payloads/context/discard';

export const discardContext = async (
    run: RunAction,
    payload: DiscardContextPayload,
    req: Request,
    res: Response,
) => {
    const result = await run(
        'discard-context',
        payload.contextId,
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
