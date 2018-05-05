class Tree {
  constructor(key, meta, parent) {
    this.parent = parent;
    this.key = key;
    this.meta = meta;
    this.children = new Map();
  }

  getKey() {
    return this.key;
  }

  getMeta() {
    return this.meta;
  }

  addChild(key, meta) {
    const child = new Tree(key, meta, this);
    this.children.set(key, child);
    return child;
  }

  getChild(key) {
    return this.children.get(key);
  }

  // BEGIN (write your solution here)
  hasChildren() {
    return this.children.size > 0;
  }
  hasChild(key) {
    return this.children.has(key);
  }
  getParent() {
    return this.parent;
  }
  removeChild(key) {
    this.children.delete(key);
  }
  getDeepChild(keys) {
    const [first, ...rest] = keys;
    if (this.hasChild(first)) {
      const current = this.getChild(first);
      return rest.length > 0 ? current.getDeepChild(rest) : current;
    }
    return undefined;
  }
  getChildren() {
    return [...this.children.values()];
  }
  // END
}

export default Tree;
