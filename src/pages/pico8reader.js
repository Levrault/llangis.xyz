import React from 'react';
import Pico8GameShell from '../components/pico8player/pico8gameshell';

/**
 * Index page
 * @class Index
 * @param {array} edges
 */
const Pico8Reader = () => {
  return <Pico8GameShell mobile cartridge="sieur-lacassagne-dungeon" />;
};

export default Pico8Reader;

