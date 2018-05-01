
function buildAttrString() {
  return Object.keys(this.attributes).map(key => ` ${key}="${this.attributes[key]}"`).join('');
}

function Node(name, attributes = {}) {
  this.name = name;
  this.attributes = attributes;
  this.buildAttrString = buildAttrString;
}

export default Node;
