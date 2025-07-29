const esbuild = require('esbuild');
const { execSync } = require('child_process');
const path = require('path');

const isWatch = process.argv.includes('--watch');

const baseConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: !isWatch,
  sourcemap: true,
  external: ['react', 'react-dom'],
  target: ['es2018'],
};

// CommonJS build
const cjsConfig = {
  ...baseConfig,
  outfile: 'dist/index.js',
  format: 'cjs',
  platform: 'node',
};

// ESM build
const esmConfig = {
  ...baseConfig,
  outfile: 'dist/index.esm.js',
  format: 'esm',
  platform: 'neutral',
};

async function build() {
  try {
    console.log('🧹 Cleaning dist folder...');
    execSync('rm -rf dist', { stdio: 'inherit' });
    
    console.log('📦 Building with esbuild...');
    
    if (isWatch) {
      // Watch mode
      console.log('👀 Starting watch mode...');
      
      const cjsContext = await esbuild.context(cjsConfig);
      const esmContext = await esbuild.context(esmConfig);
      
      await Promise.all([
        cjsContext.watch(),
        esmContext.watch()
      ]);
      
      console.log('✅ Watching for changes...');
    } else {
      // Build mode
      await Promise.all([
        esbuild.build(cjsConfig),
        esbuild.build(esmConfig)
      ]);
      
      console.log('📝 Generating TypeScript declarations...');
      execSync('tsc --emitDeclarationOnly --outDir dist', { stdio: 'inherit' });
      
      console.log('✅ Build completed successfully!');
    }
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build();