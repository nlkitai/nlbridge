import {log} from '../utils/log';

export const displayHelp = () => {
    log('');
    log('\x1b[33m' + '@nlbridge dev server CLI ' + '\x1b[0m');
    log('');
    log('Usage:');
    log('  @nlbridge/server [params]');
    log('');
    log('Required:');
    log('  --api <openai>     The AI backend to use\n' +
        '                      Only OpenAI is supported at the moment');
    log('');
    log('Optional:');
    log('  --apiKey <key>      The API key to use for the AI backend\n' +
        '                       Default: Read from environment variable (e.g. OPENAI_API_KEY)\n');
    log('  --port [port]        Port to use for HTTP server - Default: Random value between 8000 and 8999');
    log('  --cors <origin>      Enable CORS for the specified origin - Default: "*"');
    log('  --endpoint [path]    Endpoint to use for HTTP server - Default: /');
    log('');
    log('  --debug              Show debug information');
    log('  --help               Show help');
    log('');
};

