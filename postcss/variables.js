// postcss/variables.js

// colors themes
// https://www.materialpalette.com/indigo/deep-purple
const palette = {
  'palette-dark-primary': '#303F9F',
  'palette-light-primary': '#EEEEEE',
  'palette-primary': '#3F51B5',
  'palette-text-or-icon': '#fff',
  'palette-accent': '#7C4DFF',
  'palette-title': '#757575',
  'palette-primary-text': '#212121',
  'palette-secondary-text': '#9E9E9E',
  'palette-error': '#F44336',
  'palette-success': '#388E3C'
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
  middleGround: 5,
  background: 1
};

// for media queries
const viewport = {
  'viewport-xsmall': '700px',
  'viewport-small': '961px',
  'viewport-medium': '1285px',
  'viewport-large': '1600px',
  'viewport-wide': '1920px'
};

const gameCanvas = {
  'game-width': '240px',
  'game-height': '160px'
};

module.exports = { ...spaces, ...palette, ...layers, ...viewport, ...gameCanvas };
