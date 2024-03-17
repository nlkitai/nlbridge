import {RunAction} from '@nlbridge/core';
import {Request, Response} from 'express';
import {UpdateContextTasksPayload} from '../../types/payloads/context/updateTasks';

export const updateTasks = async (
    run: RunAction,
    payload: UpdateContextTasksPayload,
    req: Request,
    res: Response,
) => {
    const result = await run(
        'update-tasks',
        payload.contextId,
        payload.tasks,
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
