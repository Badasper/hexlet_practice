export default (coll, func, callback) => {
  if (coll.length === 0) {
    callback([]);
    return;
  }
  const iter = ([first, ...rest], acc) => {
    const newAcc = func(first) ? [...acc, first] : acc;
    if (rest.length === 0) {
      callback(newAcc);
      return;
    }
    setTimeout(iter, 0, rest, newAcc);
  };
  iter(coll, []);
};
