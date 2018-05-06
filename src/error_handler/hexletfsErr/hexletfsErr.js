import path from 'path';
import errors, { errno } from 'errno'; // eslint-disable-line
import Tree from '../tree/Tree'; // eslint-disable-line
import Dir from '../stats/Dir' // eslint-disable-line
import File from '../stats/File' // eslint-disable-line

const getPathParts = filepath =>
  filepath.split(path.sep).filter(part => part !== '');

export default class {
  constructor() {
    this.tree = new Tree('/', new Dir('/'));
  }

  statSync(filepath) {
    const current = this.findNode(filepath);
    if (!current) {
      return [null, errors.code.ENOENT];
    }
    return [current.getMeta().getStats(), null];
  }

  // BEGIN (write your solution here)
  unlinkSync(filepath) {
    const file = this.findNode(filepath);
    if (!file) {
      return [null, errors.code.ENOENT];
    }
    if (file.getMeta().isDirectory()) {
      return [null, errors.code.EPERM];
    }
    return [file.getParent().removeChild(file.getKey()), null];
  }

  writeFileSync(filepath, content) {
    const { base, dir } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent || parent.getMeta().isFile()) {
      return [null, errors.code.ENOENT];
    }
    const file = this.findNode(filepath);
    if (file && file.getMeta().isDirectory()) {
      return [null, errors.code.EISDIR];
    }
    return [parent.addChild(base, new File(base, content)), null];
  }

  readFileSync(filepath) {
    const file = this.findNode(filepath);
    if (!file) {
      return [null, errors.code.ENOENT];
    }
    if (file.getMeta().isDirectory()) {
      return [null, errors.code.EISDIR];
    }
    return [file.getMeta().getBody(), null];
  }
  // END

  mkdirpSync(filepath) {
    const iter = (parts, subtree) => {
      if (parts.length === 0) {
        return [subtree, null];
      }
      const [part, ...rest] = parts;
      const current = subtree.getChild(part);
      if (!current) {
        return iter(rest, subtree.addChild(part, new Dir(part)));
      }
      if (current.getMeta().isFile()) {
        return [null, errors.code.ENOTDIR];
      }

      return iter(rest, current);
    };
    const parts = getPathParts(filepath);
    return iter(parts, this.tree);
  }

  touchSync(filepath) {
    const { base, dir } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent) {
      return [null, errors.code.ENOENT];
    }
    if (parent.getMeta().isFile()) {
      return [null, errors.code.ENOTDIR];
    }
    return [parent.addChild(base, new File(base, '')), null];
  }

  readdirSync(filepath) {
    const dir = this.findNode(filepath);
    if (!dir) {
      return [null, errors.code.ENOENT];
    } else if (dir.getMeta().isFile()) {
      return [null, errors.code.ENOTDIR];
    }
    return [dir.getChildren().map(child => child.getKey()), null];
  }

  findNode(filepath) {
    const parts = getPathParts(filepath);
    return parts.length === 0 ? this.tree : this.tree.getDeepChild(parts);
  }

}
