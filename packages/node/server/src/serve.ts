#!/usr/bin/env node

import {displayHelp} from './serve/displayHelp';
import {extractArguments} from './serve/extractArguments';
import {startServer} from './serve/startServer';
import {validateCommand} from './serve/validateCommand';
import {error} from './utils/error';
import {log} from './utils/log';

const {valid, error: err, arguments: argumentsArray} = validateCommand();
if (!valid) {
    if (err) {
        error(err);
    } else {
        error('Invalid command');
    }

    displayHelp();
    process.exit(1);
}

const cliArguments = extractArguments(argumentsArray);

if (Object.keys(cliArguments).includes('help')) {
    displayHelp();
    process.exit(0);
}

if (!cliArguments.api || cliArguments.api.length === 0) {
    error('Missing required argument [--api <value>]');
    displayHelp();
    process.exit(1);
}

// Start the server
startServer(cliArguments)
    .then(({port, endpoint}) => {
        log('\x1b[32m' + `@nlbridge/server started on port ${port}` + '\x1b[0m');
        log('\x1b[34m' + `URL: http://localhost:${port}${endpoint}` + '\x1b[0m');
    })
    .catch((err) => {
        error(err);
        process.exit(1);
    });
