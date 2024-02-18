declare module '*.txt' {
}

declare module 'rollup-plugin-string' {
    export function string(options: {include: string}): Plugin;
}
