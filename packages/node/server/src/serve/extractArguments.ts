export const extractArguments = (argumentsArray?: string[]): {
    [key: string]: string[];
} => {
    if (!argumentsArray) {
        return {};
    }

    const cliArguments: {
        [key: string]: string[];
    } = {};

    if (argumentsArray) {
        let currentArgument: string | null = null;
        for (let i = 0; i < argumentsArray.length; i++) {
            const item = argumentsArray[i];
            if (item.startsWith('--')) {
                currentArgument = item.slice(2);
                if (currentArgument.includes('=')) {
                    const [name] = currentArgument.split('=');
                    const value = currentArgument.slice(name.length + 1);
                    cliArguments[name] = [];
                    currentArgument = name;
                    if (value) {
                        cliArguments[name].push(value);
                    }
                } else {
                    cliArguments[currentArgument] = [];
                }
            } else {
                if (currentArgument) {
                    cliArguments[currentArgument].push(item);
                }
            }
        }
    }

    return cliArguments;
};
