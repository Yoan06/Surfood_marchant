const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

const projectRoot = __dirname;

/** @type {import('metro-config').ConfigT} */
const config = getDefaultConfig(projectRoot);

config.resolver = config.resolver || {};
// Empêche Metro de remonter dans les dossiers parents pour résoudre des modules
config.resolver.disableHierarchicalLookup = true;
// Force les résolutions de modules à utiliser UNIQUEMENT le node_modules local
config.resolver.nodeModulesPaths = [path.join(projectRoot, 'node_modules')];

// Limite le watcher au projet courant
config.watchFolders = [projectRoot];

module.exports = config;


