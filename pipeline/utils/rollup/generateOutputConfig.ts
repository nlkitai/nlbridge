import {OutputOptions} from 'rollup';

export const generateOutputConfig = (
    packageNpmName: string, // Example: @nlbridge/express
    fileName: string, // Example: nlbridge-express
    folderName: string, // Example: express
    isProduction: boolean,
    formats: string[] = ['esm', 'cjs', 'umd'],
): OutputOptions[] => {
    const envFolder = isProduction ? 'prod' : 'dev';
    const path = `../../../dist/${envFolder}/${folderName}`;
    return [
        formats.includes('esm') && {
            file: `${path}/esm/${fileName}.js`,
            format: 'esm',
            esModule: false,
            sourcemap: !isProduction,
            strict: true,
            exports: 'named',
            name: packageNpmName,
        },
        formats.includes('cjs') && {
            file: `${path}/cjs/${fileName}.js`,
            format: 'cjs',
            esModule: false,
            sourcemap: !isProduction,
            strict: true,
            exports: 'named',
            name: packageNpmName,
        },
        formats.includes('umd') && {
            file: `${path}/umd/${fileName}.js`,
            format: 'umd',
            esModule: false,
            sourcemap: !isProduction,
            strict: true,
            exports: 'named',
            name: packageNpmName,
        },
        // Bin is a cjs format under the bin folder
        formats.includes('bin') && {
            file: `${path}/bin/${fileName}.mjs`,
            format: 'esm',
            esModule: false,
            sourcemap: !isProduction,
            strict: true,
            exports: 'named',
            name: packageNpmName,
        },
    ].filter((value: any) => value !== false) as OutputOptions[];
};
