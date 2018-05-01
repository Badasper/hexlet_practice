import Node from './NodeFunc';

function toString() {
  return `<${this.name}${this.buildAttrString()}>`;
}

function SingleTag(name, attributes = {}) {
  Node.apply(this, [name, attributes]);
  this.toString = toString;
}

export default SingleTag;
