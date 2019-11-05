import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './pico8gameshell.module.css';
import pico8HTML from '../../../static/pico8/pico8.html';

/**
 * Pico8 Gameshell
 */
class Pico8GameShell extends Component {
  /**
   * @contructor
   * @param {object} props
   */
  constructor (props) {
    super(props);
    this.state = {};
  }

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
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '/pico8/pico8.js';
    document.body.prepend(s);
  }

  /**
   * Render
   * @returns {node}
   */
  render () {
    return <div className={styles.container} dangerouslySetInnerHTML={{ __html: pico8HTML }} />;
  }
}

Pico8GameShell.propTypes = {
  cartridge: PropTypes.string
};

export default Pico8GameShell;
