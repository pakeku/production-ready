const { createThemes, defaultComponentThemes } = require('@tamagui/theme-builder');
const Colors = require('@tamagui/colors');

/**
 * Material Design 3 Theme System (CommonJS)
 * Updated to support primary, secondary, tertiary variants
 */

const lightShadows = {
  shadow1: 'rgba(0,0,0,0.04)',
  shadow2: 'rgba(0,0,0,0.08)',
  shadow3: 'rgba(0,0,0,0.16)',
  shadow4: 'rgba(0,0,0,0.24)',
  shadow5: 'rgba(0,0,0,0.32)',
  shadow6: 'rgba(0,0,0,0.4)',
};

const darkShadows = {
  shadow1: 'rgba(0,0,0,0.2)',
  shadow2: 'rgba(0,0,0,0.3)',
  shadow3: 'rgba(0,0,0,0.4)',
  shadow4: 'rgba(0,0,0,0.5)',
  shadow5: 'rgba(0,0,0,0.6)',
  shadow6: 'rgba(0,0,0,0.7)',
};

// Material Design 3 Primary Palette
const primaryLightPalette = [
  '#FFFBFE', // 0
  '#F6EFFE', // 10
  '#EADDFF', // 20
  '#D0BCFF', // 30
  '#C2B7FF', // 40
  '#B0A7FF', // 50
  '#9A8FFF', // 60
  '#827FFF', // 70
  '#6A63FF', // 80
  '#534DFF', // 90
  '#3D37FF', // 95
  '#000000', // 100
];

const primaryDarkPalette = [
  '#000000', // 0
  '#21005E', // 10
  '#371E55', // 20
  '#4D3FA0', // 30
  '#6750A4', // 40
  '#7863B8', // 50
  '#8A77D9', // 60
  '#9D88E5', // 70
  '#B0A7FF', // 80
  '#D0BCFF', // 90
  '#EADDFF', // 95
  '#FFFBFE', // 100
];

const builtThemes = createThemes({
  componentThemes: defaultComponentThemes,

  base: {
    palette: {
      dark: primaryDarkPalette,
      light: primaryLightPalette,
    },

    extra: {
      light: {
        ...Colors.green,
        ...Colors.red,
        ...Colors.yellow,
        ...lightShadows,
        shadowColor: lightShadows.shadow1,
      },
      dark: {
        ...Colors.greenDark,
        ...Colors.redDark,
        ...Colors.yellowDark,
        ...darkShadows,
        shadowColor: darkShadows.shadow1,
      },
    },
  },

  accent: {
    palette: {
      dark: [
        '#000000',
        '#1D192B',
        '#312D3D',
        '#483E52',
        '#625B71',
        '#7A7285',
        '#928A9E',
        '#ABA3B7',
        '#CCC7DB',
        '#E8DEF8',
        '#F3EDF7',
        '#FFFBFE',
      ],
      light: [
        '#FFFBFE',
        '#F5EFF7',
        '#E8DEF8',
        '#D9CAE8',
        '#C9B8D8',
        '#B9AAC5',
        '#A99CB2',
        '#998E9F',
        '#89808B',
        '#7A7278',
        '#70686E',
        '#04010B',
      ],
    },
  },

  childrenThemes: {
    primary: {
      palette: {
        dark: primaryDarkPalette,
        light: primaryLightPalette,
      },
    },

    secondary: {
      palette: {
        dark: [
          '#000000',
          '#1D192B',
          '#312D3D',
          '#483E52',
          '#625B71',
          '#7A7285',
          '#928A9E',
          '#ABA3B7',
          '#CCC7DB',
          '#E8DEF8',
          '#F3EDF7',
          '#FFFBFE',
        ],
        light: [
          '#FFFBFE',
          '#F5EFF7',
          '#E8DEF8',
          '#D9CAE8',
          '#C9B8D8',
          '#B9AAC5',
          '#A99CB2',
          '#998E9F',
          '#89808B',
          '#7A7278',
          '#70686E',
          '#04010B',
        ],
      },
    },

    tertiary: {
      palette: {
        dark: [
          '#000000',
          '#2B192E',
          '#402B45',
          '#573F5B',
          '#7D5260',
          '#956A7A',
          '#B08195',
          '#CB9AB1',
          '#FFB1C6',
          '#FFD8E4',
          '#FFECF1',
          '#FFFBFE',
        ],
        light: [
          '#FFFBFE',
          '#FEF0F7',
          '#FFD8E4',
          '#ECC4D6',
          '#DEB0C8',
          '#CDA0B5',
          '#BD91A3',
          '#AD8391',
          '#9E747F',
          '#8F656D',
          '#8A5D63',
          '#5B3E40',
        ],
      },
    },

    warning: {
      palette: {
        dark: Object.values(Colors.yellowDark),
        light: Object.values(Colors.yellow),
      },
    },

    error: {
      palette: {
        dark: Object.values(Colors.redDark),
        light: Object.values(Colors.red),
      },
    },

    success: {
      palette: {
        dark: Object.values(Colors.greenDark),
        light: Object.values(Colors.green),
      },
    },
  },
});

module.exports = { themes: builtThemes };
