import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { MdClose } from 'react-icons/md';
import { CSSTransition } from 'react-transition-group';
import IconButton from '../button/IconButton';
import PageContext from '../../context/page';
import TRANSITION from '../../animations/cssTransitionState';
import styles from './modal.module.css';


/**
 * @class NavigationMenu
 * @param {function}  onClose
 * @param {string}    flag
 * @param {function}  onTransitionExited
 * @param {node}      children
 */
class Modal extends Component {
  /**
   * Re-show scrollbar and close modal
   * @param {function} setScrollbarVisibility
   * @returns {function}
   */
  handleCloseClick = (setScrollbarVisibility) => () => {
    const { onClose } = this.props;
    onClose();
    setScrollbarVisibility(true);
  }
  /**
  * Render
  * @returns {node}
  */
  render () {
    const { flag, onTransitionExited, children } = this.props;
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
            <PageContext.Consumer>
              {({ setScrollbarVisibility }) => (
                <IconButton
                  aria-label="close contact me modal"
                  className={styles.close}
                  onClick={this.handleCloseClick(setScrollbarVisibility)}
                >
                  <MdClose />
                </IconButton>
              )}
            </ PageContext.Consumer>
            <div className={styles.inner}>
              {children}
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  flag: PropTypes.string.isRequired,
  onTransitionExited: PropTypes.func.isRequired
};

export default Modal;
