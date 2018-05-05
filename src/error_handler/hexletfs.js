import path from 'path';
import Tree from './tree/Tree'; // eslint-disable-line

const getPathParts = filepath =>
  filepath.split(path.sep).filter(x => x);

export default class {
  constructor() {
    this.tree = new Tree('/', { type: 'dir' });
  }

  isDirectory(filepath) {
    const current = this.findNode(filepath);
    return current && current.getMeta().type === 'dir';
  }

  isFile(filepath) {
    const current = this.findNode(filepath);
    return current && current.getMeta().type === 'file';
  }

  mkdirSync(filepath) {
    const { dir, base } = path.parse(filepath);
    this.findNode(dir).addChild(base, { type: 'dir' });
  }

  touchSync(filepath) {
    const { dir, base } = path.parse(filepath);
    this.findNode(dir).addChild(base, { type: 'file' });
  }

  findNode(filepath) {
    const parts = getPathParts(filepath);
    return parts.length === 0 ? this.tree : this.tree.getDeepChild(parts);
  }
}
