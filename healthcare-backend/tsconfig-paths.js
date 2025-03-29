const { createRequire } = require('module');
const require = createRequire(import.meta.url);
const tsConfig = require('./tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');

const baseUrl = tsConfig.compilerOptions.baseUrl;
const paths = tsConfig.compilerOptions.paths;

if (baseUrl && paths) {
  tsConfigPaths.register({
    baseUrl,
    paths,
  });
}
