import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import IconButton from '../button/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TRANSITION from '../../animations/cssTransitionState';
import styles from './navigationMenu.module.css';

/**
 * @class NavigationMenu
 */
const NavigationMenu = ({ onClose, flag, onTransitionExited }) => {
  return (
    <div className={classnames(styles.container, { [styles.active]: flag !== TRANSITION.UNMOUNTED })}>
      <CSSTransition
        in={flag === TRANSITION.ENTER}
        timeout={800}
        classNames={{
          enter: classnames(styles.content, styles.enter),
          enterDone: classnames(styles.content, styles.enterDone),
          exit: classnames(styles.content, styles.exit)
        }}
        onExited={() => onTransitionExited()}
        unmountOnExit
      >
        <div>
          <IconButton className={styles.close} onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <ul className={styles.list}>
            <li>Home</li>
            <li>Articles</li>
          </ul>
        </div>
      </CSSTransition>
    </div>
  );
};

NavigationMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  flag: PropTypes.string.isRequired,
  onTransitionExited: PropTypes.func.isRequired
};

export default NavigationMenu;
