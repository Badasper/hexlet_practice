import _ from 'lodash'; // eslint-disable-line

// PairedTag Start
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
// PairedTag End

// PairedTag Start
class SingleTag {
  constructor(name, attributes = {}) {
    this.name = name;
    this.attributes = attributes;
  }

  buildAttrString() {
    return Object.keys(this.attributes).map(key => ` ${key}="${this.attributes[key]}"`).join('');
  }

  toString() {
    return `<${this.name}${this.buildAttrString()}>`;
  }
}
// PairedTag End

// BuildNode start
const buildNode = (name, ...args) => {
  const singleTagsList = new Set(['hr', 'br', 'img']);
  return singleTagsList.has(name) ?
    new SingleTag(name, ...args) : new PairedTag(name, ...args);
};
// BuildNide end

// Solution Start
const propertyActions = [
  {
    name: 'body',
    check: arg => typeof arg === 'string',
    process: _.identity,
  },
  {
    name: 'children',
    check: arg => arg instanceof Array,
    process: (children, f) => children.map(f),
  },
  {
    name: 'attributes',
    check: arg => arg instanceof Object,
    process: _.identity,
  },
];

const getPropertyAction = arg => _.find(propertyActions, ({ check }) => check(arg));

const parse = (data) => {
  const [first, ...rest] = data;
  const root = {
    name: first,
    attributes: {},
    body: '',
    children: [],
  };
  const args = rest.reduce((acc, arg) => {
    const { name, process } = getPropertyAction(arg);
    return { ...acc, [name]: process(arg, parse) };
  }, root);
  return buildNode(args.name, args.attributes, args.body, args.children);
};
// Solution End

export { parse, PairedTag, SingleTag };
