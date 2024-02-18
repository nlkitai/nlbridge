import {chmodSync, cpSync, mkdirSync, rmSync} from 'fs';
import {info, nl} from '../utils/log.mjs';
import {packagesList} from './packages.mjs';
import {run} from './run.mjs';
import {applyDevVersion, applyReleaseVersion} from './version.mjs';

const copyStructure = async (env) => {
    mkdirSync(`dist/${env}`, {recursive: true});
    packagesList.forEach(pkg => {
        cpSync(pkg.npmConfigDirectory, `dist/${env}/${pkg.name}`, {recursive: true});
    });
};

nl(1);
info('###############################################');
info(`# 🚂 Pipeline Step: Set                       #`);
info('###############################################');
nl(1);

try {
    rmSync('dist', {recursive: true, force: true});
    mkdirSync(`dist`, {recursive: true});

    await copyStructure('dev');
    await copyStructure('prod');

    info('Applying versions ⏲️ to source code packages:');
    applyDevVersion('packages/node');
    applyDevVersion('dist/dev');
    applyReleaseVersion('dist/prod');

    //
    // Copy tsonfig.json to packages
    //
    for (const pkg of packagesList) {
        cpSync('pipeline/config/packageLevelTsConfig.json', `packages/${pkg.directory}/tsconfig.json`);
    }

    //
    // Install dev packages
    //
    for (const pkg of packagesList) {
        await run(`yarn workspace ${pkg.devName} install`);
    }

    //
    // Run TSC on pipeline utils folder to generate JS files
    //
    await run('cd pipeline/utils && tsc --project tsconfig.json');

    //
    // Build dev packages
    //
    for (const pkg of packagesList) {
        await run(`yarn workspace ${pkg.devName} build`);
    }

    //
    // Set permissions for bin files
    //
    for (const pkg of packagesList) {
        for (const executable of pkg.executable) {
            chmodSync(`dist/dev/${pkg.name}/${executable}`, 0o755);
        }
    }
} catch (e) {
    process.exit(1);
}
