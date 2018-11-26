import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import IconButton from '../button/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import styles from './navigationMenu.module.css';

/**
 * @class NavigationMenu
 */
class NavigationMenu extends PureComponent {
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
    const { onClose, active } = this.props;
    return (
      <div className={classnames(styles.container, { [styles.active]: active })}>
        <IconButton className={styles.close} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <ul className={styles.list}>
          <li>Home</li>
          <li>Articles</li>
        </ul>
      </div>
    );
  }
}

NavigationMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  active: PropTypes.bool
};

NavigationMenu.defaultProps = {
  active: false
};

export default NavigationMenu;
