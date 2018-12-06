// postcss/variables.js

// colors themes
// https://www.materialpalette.com/indigo/deep-purple
const palette = {
  'palette-primary': '#80d1f7',
  'palette-primary-variant': '#02a3ee',
  'palette-dark': '#212121',
  'palette-dark-light': '#607d8b',
  'palette-light': '#FFFFFF',
  'palette-border': '#dadce0'
};

// spaces
const spaces = {
  'space-xs': '4px',
  'space-s': '8px',
  'space-m': '16px',
  'space-l': '32px',
  'space-xl': '64px',
  'space-xxl': '128px'
};

// z-index
const layers = {
  foreground: 20,
  between: 10,
  middleground: 5,
  background: 1
};

// for media queries
const viewport = {
  'viewport-xsmall': '800px',
  'viewport-small': '900px',
  'viewport-medium': '1285px',
  'viewport-large': '1600px',
  'viewport-wide': '1920px'
};

const gameCanvas = {
  'game-width': '240px',
  'game-height': '160px'
};

module.exports = { ...spaces, ...palette, ...layers, ...viewport, ...gameCanvas };
