class PairedTag {
  constructor(name, attributes = {}, body = '', children = []) {
    this.name = name;
    this.attributes = attributes;
    this.body = body;
    this.children = children;
  }
  buildAttrString() {
    return Object.keys(this.attributes).map(key => ` ${key}="${this.attributes[key]}"`).join('');
  }

  toString() {
    const value = this.children.length > 0 ?
      this.children.map(arg => arg.toString()).join('') : this.body;
    return `<${this.name}${this.buildAttrString()}>${value}</${this.name}>`;
  }
}

export default PairedTag;
