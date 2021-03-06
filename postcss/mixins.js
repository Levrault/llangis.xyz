// PostCSS is needed to make this work
// const postcss = require('postcss');

module.exports = {
  // The first argument, mixin, is used to connect postCSS-mixins
  boxShadow (mixin, type) {
    switch (type) {
    case 'xs':
      return { 'box-shadow': '0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);' };
      break;
    case 's':
      return { 'box-shadow': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);' };
      break;
    case 'm':
      return { 'box-shadow': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);' };
      break;
    case 'l':
      return { 'box-shadow': '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);' };
      break;
    case 'xl':
      return { 'box-shadow': '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);' };
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
  },

  fixedFullscreen (mixin) {
    return {
      bottom: '0',
      left: '0',
      position: 'fixed',
      right: '0',
      top: '0'
    };
  }

};
