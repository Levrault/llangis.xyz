import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconButton from '../button/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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
  * @returns {node}
  */
  render () {
    const { isMenuOpen } = this.state;
    return (
      <div className={styles.container}>
        <IconButton className={styles.hamburger} onClick={this.toggleMenu}>
          <MenuIcon />
        </IconButton>
        <NavigationMenu onClose={this.toggleMenu} active={isMenuOpen} />
      </div>
    );
  }
}

Menu.propTypes = {};

Menu.defaultProps = {};

export default Menu;
