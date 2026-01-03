import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.ts', '../stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-essentials'],
  framework: '@storybook/react-webpack5',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      module: {
        ...(config.module || {}),
        rules: [
          ...((config.module && config.module.rules) || []),
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
        ],
      },
      resolve: {
        ...config.resolve,
        extensions: [...(config.resolve?.extensions || []), '.ts', '.tsx'],
      },
    };
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;

