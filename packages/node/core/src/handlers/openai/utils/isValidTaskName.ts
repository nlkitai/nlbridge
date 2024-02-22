export const isValidTaskName = (taskName: string): boolean => {
    // Return true if it's a valid Javascript function name
    return /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(taskName);
};