module.exports = function(api) {
  api.cache(true);
  return {
    plugins: ['nativewind/babel', 'expo-router/babel'],
    presets: ['babel-preset-expo'],
  };
};
