import {RunAction} from '@nlbridge/core';
import {Request, Response} from 'express';

export const getContextData = async (run: RunAction, payload: any, req: Request, res: Response) => {
    const result = await run(
        'get-context-data',
        payload.contextId || undefined,
        payload.key || undefined,
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
            data: result.data,
        },
    });
};
