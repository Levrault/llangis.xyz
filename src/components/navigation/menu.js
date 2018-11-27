import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconButton from '../button/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NavigationMenu from './navigationMenu';
import TRANSITION from '../../animations/cssTransitionState';
import styles from './menu.module.css';

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
      navigationFlag: TRANSITION.UNMOUNTED
    };
  }

  /**
   * @param {string} navigationFlag
   * @returns {function}
   */
  handleFlagChange = (navigationFlag) => () => {
    this.setState({
      navigationFlag
    });
  }

  /**
  * Render
  * @returns {node}
  */
  render () {
    const { navigationFlag } = this.state;
    return (
      <div className={styles.container}>
        <IconButton className={styles.hamburger} onClick={this.handleFlagChange(TRANSITION.ENTER)}>
          <MenuIcon />
        </IconButton>
        <NavigationMenu
          onClose={this.handleFlagChange(TRANSITION.LEAVING)}
          onTransitionExited={this.handleFlagChange(TRANSITION.UNMOUNTED)}
          flag={navigationFlag}
        />
      </div>
    );
  }
}

Menu.propTypes = {};

Menu.defaultProps = {};

export default Menu;
