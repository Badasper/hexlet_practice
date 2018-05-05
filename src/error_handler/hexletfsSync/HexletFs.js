import path from 'path';
import Tree from '../tree/Tree'; // eslint-disable-line
import Dir from '../stats/Dir'; // eslint-disable-line
import File from '../stats/File'; // eslint-disable-line


const getPathParts = filepath =>
  filepath.split(path.sep).filter(part => part !== '');

export default class {
  constructor() {
    this.tree = new Tree('/', new Dir('/'));
  }

  statSync(filepath) {
    const current = this.findNode(filepath);
    if (!current) {
      return null;
    }
    return current.getMeta().getStats();
  }

  mkdirSync(filepath) {
    const { base, dir } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent || parent.getMeta().getStats().isFile()) {
      return false;
    }
    return parent.addChild(base, new Dir(base));
  }

  mkdirpSync(filepath) {
    return getPathParts(filepath).reduce((subtree, node) => {
      if (!subtree) {
        return false;
      }
      const current = subtree.getChild(node);
      if (!current) {
        return subtree.addChild(node, new Dir(node));
      }
      if (current.getMeta().getStats().isFile()) {
        return false;
      }
      return current;
    }, this.tree);
  }

  touchSync(filepath) {
    const { base, dir } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent || parent.getMeta().getStats().isFile()) {
      return false;
    }
    parent.addChild(base, new File(base));
    return true;
  }

  readdirSync(filepath) {
    const node = this.findNode(filepath);
    if (!node || node.getMeta().getStats().isFile()) {
      return false;
    }
    return node.getChildren().map(item =>
      item.getMeta().getName());
  }

  rmdirSync(filepath) {
    const node = this.findNode(filepath);
    const { base } = path.parse(filepath);
    if (!node || node.getMeta().getStats().isFile()) {
      return false;
    }
    if (node.hasChildren()) {
      return false;
    }
    node.getParent().removeChild(base);
    return true;
  }

  findNode(filepath) {
    const parts = getPathParts(filepath);
    return parts.length === 0 ? this.tree : this.tree.getDeepChild(parts);
  }
}
