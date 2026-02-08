const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/core", "@repo/utils", "tamagui"],
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web'
    };
    return config;
  }
};

export default nextConfig;
