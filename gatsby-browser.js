/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
require('prismjs/themes/prism-tomorrow.css');

exports.onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    'llangis.xyz has been updated. ' +
      'Reload to display the latest version?'
  );

  if (answer === true) {
    window.location.reload();
  }
};
