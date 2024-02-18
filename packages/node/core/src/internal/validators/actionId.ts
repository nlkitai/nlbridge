import {ActionId, actionIds} from '../types/actions';

export const isValidActionId = (action: string): boolean => {
    return (actionIds as Array<string>).includes(action);
};

export const asValidActionId = (actionId: string): ActionId | undefined => {
    if (isValidActionId(actionId)) {
        return actionId as ActionId;
    } else {
        return undefined;
    }
};
