import {RunAction} from '@nlbridge/core';
import {Request, Response} from 'express';

export const clearContext = async (run: RunAction, payload: any, req: Request, res: Response) => {
    const result = await run(
        'clear-context',
        payload.contextId,
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
