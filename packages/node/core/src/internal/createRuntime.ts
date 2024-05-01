import {getDefaultLlmInstructions} from '../instructions/getDefaultLlmInstructions';
import {ActionExtras} from './types/actionExtras';
import {ActionHandlerConfig} from './types/actionHandlersConfig';
import {LlmInstructions} from './types/llmInstructions';

export type RunAction = <ActionId extends keyof ActionHandlerConfig>(
    action: ActionId,
    ...parameters: Parameters<ActionHandlerConfig[ActionId]>
) => ReturnType<ActionHandlerConfig[ActionId]>;

export const createRuntime = <RuntimeConfig = any>(
    actionHandlers: ActionHandlerConfig,
    llmInstructions?: LlmInstructions,
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

            const defaultLlmInstructions = getDefaultLlmInstructions();
            const llmInstructionsToUse: LlmInstructions = {
                context: llmInstructions?.context ?? defaultLlmInstructions.context,
                parameterValues: llmInstructions?.parameterValues ?? defaultLlmInstructions.parameterValues,
                taskName: llmInstructions?.taskName ?? defaultLlmInstructions.taskName,
            };

            const extrasWithConfig: ActionExtras<RuntimeConfig> = {
                config,
                getLlmInstructions: () => llmInstructionsToUse,
            };

            // Extras should always be provided as last argument — We merge it here.
            // We ignore the config since it's already provided as a separate argument.
            const possibleExtras: any = Array.isArray(parameters) && parameters.length > 0 ? parameters[parameters.length - 1] : undefined;
            if (typeof possibleExtras === 'object' && possibleExtras !== null) {
                if (typeof possibleExtras.contextId === 'string') {
                    extrasWithConfig.contextId = possibleExtras.contextId;
                }

                if (Array.isArray(possibleExtras.conversationHistory)) {
                    extrasWithConfig.conversationHistory = possibleExtras.conversationHistory;
                }

                if (typeof possibleExtras.getContextItems === 'function') {
                    extrasWithConfig.getContextItems = possibleExtras.getContextItems;
                }

                if (typeof possibleExtras.getContextItem === 'function') {
                    extrasWithConfig.getContextItem = possibleExtras.getContextItem;
                }

                if (typeof possibleExtras.getContextTasks === 'function') {
                    extrasWithConfig.getContextTasks = possibleExtras.getContextTasks;
                }

                if (typeof possibleExtras.getLlmInstructions === 'function') {
                    extrasWithConfig.getLlmInstructions = possibleExtras.getLlmInstructions;
                }
            }

            const contextId = extrasWithConfig.contextId;

            // When contextId is present and no getContext is provided, we provide a default implementation
            // that uses the 'get-context-data' action to fetch the context data!
            if (contextId && !extrasWithConfig.getContextItems) {
                extrasWithConfig.getContextItems = async (itemId?: string) => {
                    const result = await actionHandlers['get-context'](
                        contextId,
                        itemId,
                        'data',
                        extrasWithConfig,
                    );

                    if (!result || !result.success) {
                        return undefined;
                    }

                    return result.items;
                };
            }

            // When contextId is present and no getContextTasks is provided, we provide a default implementation
            // that uses the 'get-tasks-data' action to fetch the task data!
            if (contextId && !extrasWithConfig.getContextTasks) {
                extrasWithConfig.getContextTasks = async (taskId?: string) => {
                    const result = await actionHandlers['get-context'](
                        contextId,
                        taskId,
                        'task',
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
