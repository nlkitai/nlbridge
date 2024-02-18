export const PackageContent = {
    core: 'core',
    middleware: 'middleware',
    extension: 'extension',
    server: 'server',
};

export const PackagePlatform = {
    node: 'node',
};

export const packages = {
    core: {
        name: 'core',
        platform: PackagePlatform.node,
        content: PackageContent.core,
        directory: 'node/core',
        devName: '@nlbridge-dev/core',
        npmName: '@nlbridge/core',
        npmConfigDirectory: 'pipeline/npm/core',
        executable: [],
    },
    express: {
        name: 'express',
        platform: PackagePlatform.node,
        content: PackageContent.middleware,
        directory: 'node/express',
        devName: '@nlbridge-dev/express',
        npmName: '@nlbridge/express',
        npmConfigDirectory: 'pipeline/npm/express',
        executable: [],
    },
    server: {
        name: 'server',
        platform: PackagePlatform.node,
        content: PackageContent.server,
        directory: 'node/server',
        devName: '@nlbridge-dev/server',
        npmName: '@nlbridge/server',
        npmConfigDirectory: 'pipeline/npm/server',
        executable: ['bin/serve.mjs'],
    },
};

export const packagesList = Object.values(packages);
