import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './IconButton.module.css';

/**
 * HamburgerButton button
 * @param {bool} [active=false]
 * @returns {node}
 */
const IconButton = ({ active, children, ...rest }) => (
  <button
    {...rest}
    type="button"
    className={classnames(styles.container, ...rest.className)}
  >
    {children}
  </button>
);

IconButton.propTypes = {
  active: PropTypes.bool
};

IconButton.defaultProps = {
  active: false
};

export default IconButton;
