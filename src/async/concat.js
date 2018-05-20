const noop = () => {};

const once = (fn) => {
  let called = false;
  return (...args) => {
    if (called) return;
    called = true;
    fn(...args);
  };
};

const concat = (coll, func, callback = noop) => {
  const oncedCallBack = once(callback);
  if (coll.length === 0) {
    return oncedCallBack(null);
  }
  let counter = 0;
  let acc = [];
  const cb = (err, result) => {
    if (err) {
      oncedCallBack(err, acc);
      return;
    }
    counter += 1;
    acc = [...acc, ...result];
    if (counter === coll.length) {
      oncedCallBack(err, acc);
    }
  };
  coll.forEach(element => func(element, cb));
};

export default concat;
