import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import strip from '@rollup/plugin-strip';
import terser from '@rollup/plugin-terser';
import {RollupOptions} from 'rollup';
import esbuild from 'rollup-plugin-esbuild';
import {string} from 'rollup-plugin-string';
import {generateDts} from '../../../pipeline/utils/rollup/generateDts';
import {generateOutputConfig} from '../../../pipeline/utils/rollup/generateOutputConfig';

const isProduction = process.env.NODE_ENV === 'production';
const packageName = '@nlbridge/core';
const outputFile = 'nlbridge-core';
const outputFolder = 'core';

const packageConfig: () => Promise<RollupOptions[]> = async () => ([
    {
        input: './src/index.ts',
        logLevel: 'silent',
        treeshake: 'smallest',
        strictDeprecations: true,
        plugins: [
            string({
                include: '**/*.nl.txt',
            }),
            commonjs(),
            esbuild(),
            isProduction && strip({
                include: '**/*.(mjs|js|ts)',
                functions: ['debug', 'console.debug'],
            }),
            replace({
                values: {
                    'process.env.NLUX_DEBUG_ENABLED': JSON.stringify(isProduction ? 'false' : 'true'),
                },
                preventAssignment: true,
            }),
            isProduction && terser(),
        ],
        output: generateOutputConfig(packageName, outputFile, outputFolder, isProduction),
    },
    generateDts(outputFile, outputFolder, isProduction),
]);

export default packageConfig;
