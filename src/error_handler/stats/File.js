/* eslint-disable class-methods-use-this */

import Node from './Node'; // eslint-disable-line

class File extends Node {
  isFile() {
    return true;
  }

  isDirectory() {
    return false;
  }
}

export default File;
