import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styles from './pico8player.module.css';
import Pico8GameShell from './pico8gameshell';

/**
 * Redirect to homepage
 * @class Cartridge
 * @param {string} src
 */
class Pico8Player extends Component {
  /**
  * @contructor
  * @param {object} props
  */
  constructor (props) {
    super(props);
    this.state = {};
  }


  /**
  * Render
  * @returns {node}
  */
  render () {
    const { cartridge } = this.props;
    console.log('src', cartridge); //TODO: to remove
    return (
      <Fragment>
        <div className={styles.mobile}>
          <p>
              You can play Sieur Lacassagne Dungeon on your mobile device by clicking on the folling link
            <Link className={styles.text} to={'/pico8'}>
              Sieur Lacassagne Dungeon
            </Link>
          </p>
        </div>
        <div className={styles.p8container}>
          <Pico8GameShell cartridge={cartridge} />
        </div>
      </Fragment>

    );
  }
}

Pico8Player.propTypes = {
  cartridge: PropTypes.string
};


export default Pico8Player;
