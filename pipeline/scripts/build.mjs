import {chmodSync} from 'fs';
import {info, nl} from '../utils/log.mjs';
import {packagesList} from './packages.mjs';
import {run} from './run.mjs';

nl(1);
info(' ############################################### ');
info(` # 🏗️  Pipeline Step: Build                     # `);
info(' ############################################### ');
nl(1);

try {
    for (const pkg of packagesList) {
        await run(`NODE_ENV=production yarn workspace ${pkg.devName} build`);
    }

    //
    // Set permissions for bin files
    //
    for (const pkg of packagesList) {
        if (pkg.executable.length > 0) {
            info(`Setting permissions for ${pkg.name} executables`);
            for (const executable of pkg.executable) {
                chmodSync(`dist/prod/${pkg.name}/${executable}`, 0o755);
            }
        }
    }
} catch (e) {
    process.exit(1);
}
