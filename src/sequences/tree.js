import {
  l,
  isEmpty,
  head,
  tail,
  concat,
} from 'hexlet-pairs-data';

import {
  is,
  hasChildren,
  children,
  reduce,
} from 'hexlet-html-tags';

const select = (query, tree) => {
  const selectMatch = (innerQuery, dom) => {
    const isLastQuery = isEmpty(tail(innerQuery));
    const compareTag = head(innerQuery);
    const matchedElements = reduce((element, acc) => {
      const nested = hasChildren(element) ? selectMatch(query, children(element)) : l();
      if (is(compareTag, element)) {
        if (isLastQuery) {
          return concat(nested, concat(acc, l(element)));
        }
        if (hasChildren(element)) {
          const match = concat(nested, selectMatch(tail(innerQuery), children(element)));
          return concat(acc, match);
        }
      }
      return concat(acc, nested);
    }, l(), dom);
    return matchedElements;
  };
  return selectMatch(query, tree);
};

export default select;
