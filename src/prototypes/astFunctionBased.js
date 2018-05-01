import _ from 'lodash'; // eslint-disable-line

import PairedTag from './PairedTagFunc';
import SingleTag from './SingleTagFunc';

const singleTagsList = new Set(['hr', 'br', 'img']);
const buildNode = (name, ...args) => {
  const C = singleTagsList.has(name) ? SingleTag : PairedTag;
  return new C(name, ...args);
};

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
  const root = {
    name: data[0],
    attributes: {},
    body: '',
    children: [],
  };
  const args = data.slice(1)
    .reduce((acc, arg) => {
      const { name, process } = getPropertyAction(arg);
      return {
        ...acc,
        [name]: process(arg, parse),
      };
    }, root);
  return buildNode(args.name, args.attributes, args.body, args.children);
};

export { parse, buildNode };
