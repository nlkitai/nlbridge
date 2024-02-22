import {RunAction} from '@nlbridge/core';
import {Request, Response} from 'express';

export const registerTask = async (run: RunAction, payload: any, req: Request, res: Response) => {
    const result = await run(
        'register-task',
        payload.contextId,
        payload.taskId,
        payload.parameters,
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
