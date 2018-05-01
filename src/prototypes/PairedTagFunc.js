import Node from './NodeFunc';

function toString() {
  const value = this.children.length > 0 ?
    this.children.map(arg => arg.toString()).join('') : this.body;
  return `<${this.name}${this.buildAttrString()}>${value}</${this.name}>`;
}

function PairedTag(name, attributes = {}, body = '', children = []) {
  Node.apply(this, [name, attributes]);
  this.body = body;
  this.children = children;
  this.toString = toString;
}

export default PairedTag;
