import {ActionExtras} from './types/actionExtras';
import {ActionHandlerConfig} from './types/actionHandlersConfig';

export type RunAction = <ActionId extends keyof ActionHandlerConfig>(
    action: ActionId,
    ...parameters: Parameters<ActionHandlerConfig[ActionId]>
) => ReturnType<ActionHandlerConfig[ActionId]>;

export const createRuntime = <RuntimeConfig = any>(
    actionHandlers: ActionHandlerConfig,
    config?: RuntimeConfig,
): {run: RunAction} => {
    return {
        run: (actionId, ...parameters) => {
            const callback = actionHandlers[actionId];
            if (!callback) {
                throw new Error('Unsupported action');
            }

            // Params except last argument
            const paramsWithoutExtras: any[] = Array.isArray(parameters) && parameters.length > 0
                ? parameters.slice(0, -1)
                : [];

            const extras: any = Array.isArray(parameters) && parameters.length > 0
                ? parameters[parameters.length - 1] :
                {};

            const extrasWithConfig: ActionExtras = (typeof extras === 'object' && extras !== null)
                ? {...extras, config}
                : {config};

            // When contextId is present and no getContextData is provided, we provide a default implementation
            // that uses the 'get-context-data' action to fetch the context data!
            if (extras.contextId && !extras.getContextData) {
                extrasWithConfig.getContextData = async (itemId?: string) => {
                    const result = await actionHandlers['get-context-data'](
                        extras.contextId,
                        itemId,
                        extrasWithConfig,
                    );

                    if (!result || !result.success) {
                        return undefined;
                    }

                    return result.data;
                };
            }

            // When contextId is present and no getTasksData is provided, we provide a default implementation
            // that uses the 'get-tasks-data' action to fetch the task data!
            if (extras.contextId && !extras.getTasksData) {
                extrasWithConfig.getTasksData = async () => {
                    const result = await actionHandlers['get-context-data'](
                        extras.contextId,
                        undefined,
                        extrasWithConfig,
                    );

                    if (!result || !result.success) {
                        return undefined;
                    }

                    return result.tasks;
                };
            }

            return callback(
                // @ts-ignore
                ...paramsWithoutExtras,
                extrasWithConfig,
            ) as ReturnType<typeof callback>;
        },
    };
};
