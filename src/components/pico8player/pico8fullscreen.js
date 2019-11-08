import React from 'react';
import Pico8GameShell from './pico8gameshell';
import styles from './pico8fullscreen.module.css';
console.log('styles', styles); //TODO: to remove

/**
 * Full screen player
 * @class Pico8FullScreen
 */
const Pico8FullScreen = () => {
  return <Pico8GameShell fullscreen cartridge="sieur-lacassagne-dungeon" />;
};

export default Pico8FullScreen;
