import React, { PureComponent } from 'react';
import PageContext from '../../context/page';
import IconButton from '../button/IconButton';
import { MdMenu } from 'react-icons/md';
import Modal from '../modal/modal';
import ContactMe from '../contact/contactme';
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
      modalFlag: TRANSITION.UNMOUNTED
    };
  }

  /**
   * @param {string} modalFlag
   * @param {function} setScrollbarVisibility
   * @returns {function}
   */
  handleModal = (modalFlag, setScrollbarVisibility) => () => {
    this.setState({
      modalFlag
    });

    setScrollbarVisibility(false);
  }

  /**
   * @param {string} modalFlag
   * @returns {function}
   */
  handleFlagChange = (modalFlag) => () => {
    this.setState({
      modalFlag
    });
  }

  /**
  * Render
  * @returns {node}
  */
  render () {
    const { modalFlag } = this.state;
    return (
      <div className={styles.container}>

        <PageContext.Consumer>
          {({ setScrollbarVisibility }) => (
            <IconButton
              aria-label="open contact me modal"
              className={styles.hamburger}
              onClick={this.handleModal(TRANSITION.ENTER, setScrollbarVisibility)}
            >
              <MdMenu />
            </IconButton>
          )}
        </PageContext.Consumer>

        <Modal
          onClose={this.handleFlagChange(TRANSITION.LEAVING)}
          onTransitionExited={this.handleFlagChange(TRANSITION.UNMOUNTED)}
          flag={modalFlag}
        >
          <ContactMe />
        </Modal>
      </div>
    );
  }
}

Menu.propTypes = {};

Menu.defaultProps = {};

export default Menu;
