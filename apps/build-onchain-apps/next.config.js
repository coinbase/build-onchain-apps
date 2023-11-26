/**
 * @type {import('next').NextConfig}
 */
const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');

const publicDest = 'public';
const swFile = 'sw.js';

/**
 * For workbox configurations:
 * https://developer.chrome.com/docs/workbox/reference/workbox-webpack-plugin/
 */
const NextWorkboxPlugin = new WorkboxPlugin.GenerateSW({
  swDest: path.join(publicDest, swFile),
  skipWaiting: true,
  clientsClaim: true,
  cleanupOutdatedCaches: true,
});

const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    // TODO Move this code in a utils function
    if (process.env.NODE_ENV === 'development') {
      options.isServer && console.log('> [Webpack] PWA support is disabled');
      return config;
    }
    console.log(`> [Webpack] Compile ${options.isServer ? 'server' : 'client (static)'}`);
    if (!options.isServer) {
      console.log(`> [Webpack] Service worker: ${path.join(publicDest, swFile)}`);
      config.plugins.push(NextWorkboxPlugin);
    }
    return config;
  },
};

module.exports = nextConfig;
