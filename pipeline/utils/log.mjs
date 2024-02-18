export const info = (message, ...args) => {
    console.log('[nlbridge pipeline]', message, ...args);
};

export const nl = (howMany = 1) => {
    console.log('\n'.repeat(howMany));
};

export const error = (message, ...args) => {
    console.error('[nlbridge pipeline]', message, ...args);
};

export const warn = (message, ...args) => {
    console.warn('[nlbridge pipeline]', message, ...args);
}

export const throwError = (message, ...args) => {
    error(message, ...args);
    throw new Error(`[nlbridge pipeline] ${message} ${args.join(' ')}`);
};

export const rawLog = (message, ...args) => {
    console.log(message, ...args);
};
