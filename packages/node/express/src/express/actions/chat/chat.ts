import {RunAction} from '@nlbridge/core';
import {Request, Response} from 'express';
import {defaultExtras, extrasFromPayload} from '../../defaultExtras';

export const chat = async (run: RunAction, payload: any, req: Request, res: Response) => {
    const outcome = await run(
        'chat',
        payload.message,
        extrasFromPayload(payload),
    );

    if (!outcome.success) {
        res.status(500).send({
            success: false,
            error: outcome.error,
        });
        return;
    }

    res.status(200).send({
        success: true,
        result: {
            response: outcome.message,
        },
    });
};
