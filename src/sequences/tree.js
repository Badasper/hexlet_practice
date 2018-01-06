// eslint-disable-next-line
import { l, isList, isEmpty, head, tail, concat, toString as listToString } from 'hexlet-pairs-data';
// eslint-disable-next-line
import { is, toString as htmlToString, hasChildren, children, filter, reduce } from 'hexlet-html-tags';

const select = (query, tree) => {
  const selectMatch = (innerQuery, dom) => {
    if (isEmpty(innerQuery)) {
      return dom;
    }
    const isLastQuery = isEmpty(tail(innerQuery));
    const compareTag = head(innerQuery);
    const matchedElements = reduce((element, acc) => {
      const nested = hasChildren(element) ? selectMatch(query, children(element)) : l();
      if (is(compareTag, element)) {
        if (isLastQuery) {
          return concat(acc, l(element));
        }
        if (hasChildren(element)) {
          return concat(nested, concat(acc, selectMatch(tail(innerQuery), children(element))));
        }
      }
      return concat(acc, nested);
    }, l(), dom);
    return matchedElements;
  };
  return selectMatch(query, tree);
};

export default select;
