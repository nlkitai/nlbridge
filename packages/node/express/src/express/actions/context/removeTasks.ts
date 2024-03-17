import {RunAction} from '@nlbridge/core';
import {Request, Response} from 'express';
import {RemoveContextTasksPayload} from '../../types/payloads/context/removeTasks';

export const removeTasks = async (
    run: RunAction,
    payload: RemoveContextTasksPayload,
    req: Request,
    res: Response,
) => {
    const result = await run(
        'remove-tasks',
        payload.contextId,
        payload.taskIds,
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
