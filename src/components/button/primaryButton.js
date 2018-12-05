import React from 'react';
import classnames from 'classnames';
import styles from './primaryButton.module.css';

/**
 * Primary button
 * @param {bool} [active=false]
 * @returns {node}
 */
const PrimaryButton = ({ active, children, ...rest }) => (
  <button
    {...rest}
    type="button"
    className={classnames(styles.container, ...rest.className)}
  >
    {children}
  </button>
);

export default PrimaryButton;
