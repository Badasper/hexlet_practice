import _ from 'lodash'; // eslint-disable-line

const buildHtml = (dom) => {
  const typeFinder = (element) => {
    if (!element) return '';
    if (element instanceof Array) {
      return 'children';
    }
    if (typeof element === 'string') {
      return 'body';
    }
    return 'attr';
  };
  const meta = {
    attr: (element) => {
      if (typeFinder(element) === 'attr') {
        return ` ${_.map(element, (value, key) => `${key}="${value}"`).join(' ')}`;
      }
      return '';
    },
    body: (element) => {
      if (typeFinder(element) === 'body') {
        return element;
      }
      return '';
    },
    children: (element) => {
      if (typeFinder(element) === 'children') {
        return _.map(element, buildHtml).join('');
      }
      return '';
    },
  };
  const tag = dom[0];
  const firstElement = dom[1];
  const secondElement = dom[2];
  const attr = meta.attr(firstElement) || meta.attr(secondElement);
  const body = meta.body(firstElement) || meta.body(secondElement);
  const children = meta.children(firstElement) || meta.children(secondElement);

  return `<${tag}${attr}>${body}${children}</${tag}>`;
};

export default buildHtml;
