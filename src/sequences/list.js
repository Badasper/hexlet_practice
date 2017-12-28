const substr = (str, index = 0, length = str.length) => str.substr(index, length);
const length = str => str.length;
const indexOf = (str, s) => str.indexOf(s);

const delimiter = '\n';

const l = (...items) => items.join(delimiter);

const cons = (element, list) => {
  if (list) {
    return `${element}${delimiter}${list}`;
  }
  return element;
};

const head = (list) => {
  const firstIndexDeliniter = indexOf(list, delimiter);
  if (firstIndexDeliniter === -1) {
    return list;
  }
  return substr(list, 0, firstIndexDeliniter);
};

const tail = (list) => {
  const firstIndexDeliniter = indexOf(list, delimiter);
  if (firstIndexDeliniter === -1) {
    return '';
  }

  return substr(list, firstIndexDeliniter + 1, length(list) - 1);
};

const filter = (fn, list) => {
  const iter = (listLocal, acc) => {
    const element = head(listLocal);
    if (element === '') {
      return acc;
    }
    if (!fn(element)) {
      return iter(tail(listLocal), acc);
    }
    const newAcc = acc ? `${acc}${delimiter}${element}` : element;
    return iter(tail(listLocal), newAcc);
  };
  return iter(list, '');
};

const map = (fn, list) => {
  const iter = (listLocal, acc) => {
    const element = head(listLocal);
    if (element === '') {
      return acc;
    }
    const newAcc = acc ? `${acc}${delimiter}${fn(element)}` : `${fn(element)}`;
    return iter(tail(listLocal), newAcc);
  };
  return iter(list, '');
};

const isEmpty = list => list === '';

const reduce = (fn, initial, list) => {
  const iter = (listLocal, localAcc) => {
    if (isEmpty(listLocal)) {
      return localAcc;
    }
    const element = head(listLocal);
    const newAcc = `${fn(element, localAcc)}`;
    return iter(tail(listLocal), newAcc);
  };
  return iter(list, initial);
};

const toString = list => `(${list.split(delimiter).join(', ')})`;

export { l, head, tail, filter, map, reduce, isEmpty, cons, toString };
