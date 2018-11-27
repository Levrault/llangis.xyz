var postCSSConfig = [
  /* reset inherited rules */
  require('postcss-initial')({
    reset: 'inherited' // reset only inherited rules
  }),
  /* enable css @imports like Sass/Less */
  require('postcss-import'),
  /* cssnext */
  require('postcss-cssnext'),
  /* enable mixins like Sass/Less */
  require('postcss-mixins')({
    mixins: require('./postcss/mixins')
  }),
  /* require global variables */
  require('postcss-simple-vars')({
    variables: function variables () {
      return require('./postcss/variables');
    },
    unknown: function unknown (node, name, result) {
      node.warn(result, 'Unknown variable ' + name);
    }
  }),
  /* enable nested css selectors like Sass/Less */
  require('postcss-nested'),
  /* PostCSS plugin for making calculations with math.js  */
  require('postcss-math'),
  /* transform W3C CSS color function to more compatible CSS. */
  require('postcss-color-function'),
  // flexbugs-fixes
  require('postcss-flexbugs-fixes')
];

// Export the PostCSS Config for usage in webpack
module.exports = () => ({
  plugins: [
    ...postCSSConfig
  ]
});
