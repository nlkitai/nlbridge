export const validateCommand = (): {
    valid: boolean;
    error?: string;
    arguments?: string[];
} => {
    const cliArguments = process.argv;
    if (!cliArguments || cliArguments.length < 2) {
        return {
            valid: false,
            error: '@nlbridge/server | Invalid command: Unable to detect CLI arguments!',
        };
    }

    const nodeArgIndex = cliArguments.findIndex((arg) => arg.endsWith('node'));
    if (nodeArgIndex === -1) {
        return {
            valid: false,
            error: '@nlbridge/server | No Node JS binary argument is found!',
        };
    }

    const serveBinArg = cliArguments.length > nodeArgIndex + 1 ? cliArguments[nodeArgIndex + 1] : null;
    if (!serveBinArg || (
        !serveBinArg.endsWith('serve.js') &&
        !serveBinArg.endsWith('.bin/nlbridge-serve') &&
        !serveBinArg.endsWith('.bin/nlbridge-serve.js')
    )) {
        return {
            valid: false,
            error: '@nlbridge/server | Invalid command : \'serve.js\' is missing or invalid!',
        };
    }

    const extraArguments = cliArguments
        .slice(nodeArgIndex + 2) // Remove the Node JS and serve.bin.js arguments
        .filter((arg) => arg !== '--'); // Remove any empty '--' arguments

    if (extraArguments.length > 0 && !extraArguments[0].startsWith('--')) {
        return {
            valid: false,
            error: `@nlbridge/server | Invalid command : Unexpected first arguments \'${extraArguments[0]}\'`,
        };
    }

    return {
        valid: true,
        arguments: extraArguments,
    };
};
