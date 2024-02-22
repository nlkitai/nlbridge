export type ContextData = {
    [itemId in string]: any;
};

export type ContextTask = {
    taskId: string;
    parameters: string[];
};

export type ContextTaskData = {
    [taskId in string]: ContextTask;
};
