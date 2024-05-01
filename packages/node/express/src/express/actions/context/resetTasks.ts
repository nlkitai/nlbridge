import {RunAction} from '@nlbridge/core';
import {Request, Response} from 'express';
import {defaultExtras, extrasFromPayload} from '../../defaultExtras';
import {ResetContextTasksPayload} from '../../types/payloads/context/resetTasks';

export const resetTasks = async (
    run: RunAction,
    payload: ResetContextTasksPayload,
    req: Request,
    res: Response,
) => {
    const result = await run(
        'reset-tasks',
        payload.contextId,
        payload.tasks,
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
