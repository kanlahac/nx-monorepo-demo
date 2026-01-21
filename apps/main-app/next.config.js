//@ts-check

 
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  transpilePackages: ['@libs/popups'],
  nx: {},

  //SPA config
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  // CI/CD
  basePath: process.env.NODE_ENV === 'production' ? '/nx-monorepo-demo' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/nx-monorepo-demo/' : '',
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
