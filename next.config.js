const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  // The demo app imports from the package name so it mirrors how external
  // consumers will use it. Locally we alias that to the source folder.
  webpack: (config) => {
    config.resolve.alias['mockupphone'] = path.resolve(__dirname, 'src/index.tsx');
    return config;
  },
};
