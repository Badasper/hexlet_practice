/* eslint-disable class-methods-use-this */

import Node from './Node'; // eslint-disable-line

class File extends Node {
  constructor(name, body) {
    super(name);
    this.body = body;
  }
  isFile() {
    return true;
  }

  isDirectory() {
    return false;
  }

  getBody() {
    return this.body;
  }
}

export default File;
