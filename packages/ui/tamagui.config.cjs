const { createTamagui } = require('tamagui');
const { defaultConfig } = require('@tamagui/config/v4');
const { themes } = require('./themes.cjs');

module.exports = createTamagui({
  ...defaultConfig,
  themes,
});
