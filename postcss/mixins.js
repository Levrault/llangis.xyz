// PostCSS is needed to make this work
const postcss = require('postcss');

const mixins = {
  // The first argument, mixin, is used to connect postCSS-mixins
  boxShadow (mixin, type) {
    switch (type) {
    case 'xs':
      return { 'box-shadow': '0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);' };
      break;
    default:
      return { 'box-shadow': '0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);' };
    }
  },

  horizontalList (mixin) {
    return {
      'align-items': 'center',
      'display': 'flex',
      'flex': '1',
      'margin': '0',
      'padding': '0',
      'list-style': 'none'
    };
  }
};
module.exports = mixins;
