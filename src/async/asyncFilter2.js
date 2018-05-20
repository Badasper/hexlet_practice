const noop = () => {};

const once = (fn) => {
  let called = false;

  return (...args) => {
    if (called) return;
    called = true;
    fn(...args);
  };
};

const filter = (coll, func, callback = noop) => {
  const onceCall = once(callback);
  if (coll.length === 0) {
    return onceCall(null, []);
  }
  let count = 0;
  let filtered = [];

  coll.forEach(element => func(element, (err, result) => {
    if (err) {
      onceCall(err, null);
      return;
    }
    count += 1;
    if (result) {
      filtered = [...filtered, element];
    }
    if (count === coll.length) {
      onceCall(err, coll.reduce((acc, item) => {
        return filtered.includes(item) ? [...acc, item] : acc;
      }, []));
    }
  }));
};

export default filter;
