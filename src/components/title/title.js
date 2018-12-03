import React from 'react';
import styles from './title.module.css';

/**
 *  @class Titlej
 * @param {node} children
 */
const Title = ({ children }) => (
  <h1 className={styles.container}>
    {children}
  </h1>
);

export default Title;
