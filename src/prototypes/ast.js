import { find, identity } from 'lodash'; // eslint-disable-line

const singleTagsList = new Set(['hr', 'img', 'br']);

const propertyActions = [
  {
    name: 'body',
    check: arg => typeof arg === 'string',
  },
  {
    name: 'children',
    check: arg => arg instanceof Array,
  },
  {
    name: 'attributes',
    check: arg => arg instanceof Object,
  },
];

const getPropertyAction = arg => find(propertyActions, ({ check }) => check(arg));

const buildAttrString = attrs =>
  Object.keys(attrs).map(key => ` ${key}="${attrs[key]}"`).join('');

const parse = (data) => {
  const [first, ...rest] = data;
  const root = {
    name: first,
    attributes: {},
    body: '',
    children: [],
  };
  const tag = rest
    .reduce((acc, arg) => {
      const { name } = getPropertyAction(arg);
      return { ...acc, [name]: arg };
    }, root);
  return { ...tag, children: tag.children.map(parse) };
};

const render = (ast) => {
  const closeTag = singleTagsList.has(ast.name) ? '' : `</${ast.name}>`;
  return `<${ast.name}${buildAttrString(ast.attributes)}>${ast.body}${ast.children.map(render).join('')}${closeTag}`;
};

export { render, parse };
