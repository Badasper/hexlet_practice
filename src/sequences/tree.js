// eslint-disable-next-line
import { l, isList, isEmpty, head, tail, concat, toString as listToString } from 'hexlet-pairs-data';
// eslint-disable-next-line
import { is, toString as htmlToString, hasChildren, children, filter, reduce } from 'hexlet-html-tags';


const select = (query, dom) => {
  const getStartTags = (startTag, dom2) => {
    const filtered = filter(element => is(startTag, element), dom2);
    if (startTag === 'div') return filtered;
    return reduce((element, acc) => {
      if (hasChildren(element)) {
        return concat(acc, getStartTags(startTag, children(element)));
      }
      return acc;
    }, filtered, dom2);
  };

  const getFirstChildren = (tree) => {
    if (isList(tree)) {
      const ans = reduce((element, acc) => {
        if (isEmpty(acc)) {
          if (isList(element)) return l(element);
          return l(element);
        }
        return acc;
      }, l(), tree);
      return ans;
    }
    return l(tree);
  };

  const getMatches = (rest, dom2) => {
    if (isEmpty(rest)) {
      return dom2;
    }
    const isLastQuery = isEmpty(tail(rest));
    const compareTag = head(rest);
    const matchedElements = reduce((element, acc) => {
      if (is(compareTag, element)) {
        if (isLastQuery) {
          return concat(acc, l(element));
        }
        if (hasChildren(element)) {
          const firstChildren = getFirstChildren(children(element));
          const first = isList(firstChildren) ? firstChildren : l(firstChildren);
          return concat(first, acc);
        }
      }
      return acc;
    }, l(), dom2);
    return getMatches(tail(rest), matchedElements);
  };
  const startDom = getStartTags(head(query), dom);
  const answer = getMatches(query, startDom);
  return answer;
};

// const select = (query, html, insideQuery = false) => {
//   if (isEmpty(query)) {
//     return html;
//   }
//   const newHtml = reduce((element, acc) => {
//     if (is(head(query), element)) {
//       const childrenElements = hasChildren(element) ? children(element) : l();
//       const elements = isEmpty(tail(query)) ? l(element) : childrenElements;
//       return concat(elements, acc);
//     }
//     if (hasChildren(element) && !insideQuery) {
//       return concat(select(query, children(element)), acc);
//     }
//     return acc;
//   }, l(), html);
//   const ans = select(tail(query), newHtml, true);
//   // console.log(listToString(ans));
//   return select(tail(query), newHtml, true);
// };
export { listToString };
export default select;
