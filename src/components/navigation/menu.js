import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import HamburgerButton from '../button/hamburgerButton';
import styles from './menu.module.css';
import NavigationMenu from './navigationMenu';

/**
 * Site header
 * @returns {node}
 */
class Menu extends PureComponent {
  /**
  * @contructor
  * @param {object} props
  */
  constructor (props) {
    super(props);
    this.state = {
      isMenuOpen: false
    };
  }

  /**
   * Toggle isMenuOpen state
   */
  toggleMenu = () => {
    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen
    }));
  }

  /**
  * Render
  * @returns {nodek}
  */
  render () {
    const { isMenuOpen } = this.state;
    return (
      <div className={styles.container}>
        <HamburgerButton onClick={this.toggleMenu} />
        {isMenuOpen && <NavigationMenu />}
      </div>
    );
  }
}

Menu.propTypes = {};

Menu.defaultProps = {};

export default Menu;
