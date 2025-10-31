module.exports = function (api) {
  api.cache(true);

  const plugins = [];

  // Try to load react-native-worklets plugin if available
  try {
    require.resolve('react-native-worklets/plugin');
    plugins.push('react-native-worklets/plugin');
  } catch (e) {
    console.log('[Babel] react-native-worklets/plugin not found, skipping');
  }

  // Always add reanimated plugin (must be last)
  plugins.push('react-native-reanimated/plugin');

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins,
  };
};
