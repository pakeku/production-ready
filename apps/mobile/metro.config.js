const path = require('path');
const { getDefaultConfig } = require('@expo/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(__dirname, '..', '..');

const config = getDefaultConfig(projectRoot);

// Include monorepo root and packages to watch and resolve modules from
config.watchFolders = [
  workspaceRoot,
  path.resolve(workspaceRoot, 'packages'),
];

// Prevent duplicate module resolution (e.g., React)
config.resolver = config.resolver || {};
config.resolver.extraNodeModules = new Proxy({}, {
  get: (target, name) => path.join(workspaceRoot, 'node_modules', name)
});

// Ensure the project resolves modules from the workspace node_modules only to avoid duplicates
config.resolver.nodeModulesPaths = [
  path.join(workspaceRoot, 'node_modules'),
  path.join(projectRoot, 'node_modules')
];

// Ensure 'App' resolves to the repo root entry, since Expo injects '../../App'
config.resolver.extraNodeModules.App = path.join(workspaceRoot, 'App');

module.exports = config;
