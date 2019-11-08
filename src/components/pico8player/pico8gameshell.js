import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './pico8gameshell.module.css';
import pico8HTML from '../../../static/pico8/pico8.html';

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
    window.cartridge = `/pico8/${this.props.cartridge}.js`;
    const pico8js = document.createElement('script');
    pico8js.type = 'text/javascript';
    pico8js.src = '/pico8/pico8.js';
    document.body.appendChild(pico8js);
  }

  /**
   * Render
   * @returns {node}
   */
  render () {
    const { fullscreen, cartridge } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.coverContainer}>
          <img className={styles.cover} src={`/pico8/${cartridge}.png`} />
        </div>
        <div
          className={classnames(styles.p8container, { [styles.fullscreen]: fullscreen })}
          dangerouslySetInnerHTML={{ __html: pico8HTML }}
        />
      </div>
    );
  }
}

Pico8GameShell.propTypes = {
  cartridge: PropTypes.string,
  fullscreen: PropTypes.bool
};

export default Pico8GameShell;
