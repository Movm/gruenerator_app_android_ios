// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add any custom config here
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs'];

module.exports = config;
