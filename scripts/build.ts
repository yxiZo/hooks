await Bun.build({
    entrypoints: ['./src/index.tsx'],
    outdir: './out',
    minify: {
        // whitespace: true,
        // identifiers: true,
        // syntax: true,
    },
    format: 'esm',
    external: ["lodash", "react", "react-dom"], // default: []
})