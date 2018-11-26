import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Menu from '@material-ui/icons/Menu';
import styles from './hamburgerButton.module.css';

/**
 * HamburgerButton button
 * @param {bool} [active=false]
 * @returns {node}
 */
const HamburgerButton = ({ active, ...rest }) => (
  <button
    type="button"
    className={classnames(styles.container, { [styles.active]: active })}
    {...rest}
  >
    <Menu />
  </button>
);

HamburgerButton.propTypes = {
  active: PropTypes.bool
};

HamburgerButton.defaultProps = {
  active: false
};

export default HamburgerButton;
