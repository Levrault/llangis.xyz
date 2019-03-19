import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.666,
  headerFontFamily: [
    'Avenir Next',
    'Helvetica Neue',
    'Segoe UI',
    'Helvetica',
    'Arial',
    'sans-serif'
  ],
  bodyFontFamily: ['Georgia', 'serif'],
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    '@media screen and (max-width: 672px)': {
      'div.gatsby-highlight': {
        'margin-right': '-1.3125rem',
        'margin-left': '-1.3125rem',
        'margin-bottom': '1.31951rem'
      }
    },
    '@media screen and (min-width: 673px)': {
      'pre, img': {
        'border-radius': '10px'
      },
      'div.gatsby-highlight': {
        'margin-bottom': '1.31951rem'
      }
    }
  })
});

export default typography;
