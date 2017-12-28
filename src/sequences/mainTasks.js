//  @flow

import { l, isEmpty,
  head, tail, cons,
  reverse, filter,
  reduce, isList,
  has, concat } from 'hexlet-pairs-data';


const firstNElements = (n: number, list: any) => {
  if (n <= 0 || isEmpty(list)) {
    return l();
  }
  return cons(head(list), firstNElements(n - 1, tail(list)));
};

const zip = (list1: any, list2: any) => {
  if (isEmpty(list2) || isEmpty(list1)) {
    return l();
  }

  return cons(l(head(list1), head(list2)), zip(tail(list1), tail(list2)));
};

const sameParity = (data: any) => {
  const firstElementParity = isEmpty(data) ? 0 : Math.abs(head(data) % 2);
  return filter(element => Math.abs(element % 2) === firstElementParity, data);
};

const isSafeQueens = (list: any) => {
  const iter2 = (idx, compareList2) => {
    if (isEmpty(tail(compareList2))) {
      return true;
    }
    const x1 = head(compareList2);
    const y1 = idx;

    const isSafe = (compareList1, y2) => {
      const x2 = head(compareList1);
      const derivative = x1 === x2 ? 0 : Math.abs((y2 - y1) / (x2 - x1));
      if (derivative === 0 || derivative === 1) {
        return false;
      }
      if (isEmpty(tail(compareList1))) {
        return true;
      }
      return isSafe(tail(compareList1), y2 + 1);
    };

    if (!isSafe(tail(compareList2), y1 + 1)) {
      return false;
    }
    return iter2(idx + 1, tail(compareList2));
  };
  return iter2(1, list);
};

const union = (list1: any, list2: any) => {
  const list = reduce((element, acc) => cons(element, acc), list2, reverse(list1));
  const ans = reduce((element, acc) => {
    if (has(acc, element)) {
      return acc;
    }
    return cons(element, acc);
  }, l(), list);
  return reverse(ans);
};

const flatten = (list: any) => {
  const iter = (acc, listLocal) => {
    const ans = reduce((element, accLocal) => {
      if (isList(element)) {
        return iter(accLocal, element);
      }
      return cons(element, accLocal);
    }, acc, listLocal);
    return ans;
  };
  return reverse(iter(l(), list));
};

const sort = (list: any) => {
  const devideList = (listLocal) => {
    if (isEmpty(listLocal)) {
      return l();
    }
    const first = head(listLocal);
    const listGreater = filter(element => element > first, tail(listLocal));
    const listLessEqual = filter(elemen => elemen <= first, tail(listLocal));
    return concat(devideList(listLessEqual), cons(first, devideList(listGreater)));
  };
  return devideList(list);
};

export { firstNElements, zip, sameParity, isSafeQueens, union, flatten, sort };
