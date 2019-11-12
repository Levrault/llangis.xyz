import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './pico8gameshell.module.css';
import pico8Mobile from '../../../static/pico8/pico8-mobile.html';
import pico8Browser from '../../../static/pico8/pico8-browser.html';

/**
 * Pico8 Gameshell
 */
class Pico8GameShell extends PureComponent {
  /**
   * add pico 8 script
   */
  componentDidMount () {
    if (this.props.cartridge) {
      this.initCartridge();
    }
  }

  /**
   * add pico 8 script
   * @param {object} prevProps
   */
  componentDidUpdate (prevProps) {
    const { cartridge } = this.props;
    if (prevProps.cartridge !== cartridge) {
      this.initCartridge();
    }
  }

  /**
   * Init pico 8 script
   */
  initCartridge = () => {
    const { cartridge } = this.props;
    window.cartridge = `/pico8/${cartridge}.js`;
    const pico8js = document.createElement('script');
    pico8js.type = 'text/javascript';
    pico8js.src = '/pico8/pico8.js';
    pico8js.onload = () => {
      var start = document.getElementById('p8_start_button');
      start.style.background = `url(/pico8/${cartridge}.png)`;
      start.style.backgroundSize = '100%';
    };
    document.body.appendChild(pico8js);
  }

  /**
   * Render
   * @returns {node}
   */
  render () {
    const { mobile } = this.props;
    const html = mobile ? pico8Mobile : pico8Browser;

    return (
      <div className={styles.container}>
        <div
          className={styles.p8container}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    );
  }
}

Pico8GameShell.propTypes = {
  cartridge: PropTypes.string,
  mobile: PropTypes.bool
};

export default Pico8GameShell;
