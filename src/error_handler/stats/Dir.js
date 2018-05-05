/* eslint-disable class-methods-use-this */

import Node from './Node'; // eslint-disable-line

class Dir extends Node {
  isFile() {
    return false;
  }

  isDirectory() {
    return true;
  }
}

export default Dir;
