const retry = (n, func, callback) => {
  const cb = (err, result) => {
    if (!err || n <= 1) {
      callback(err, result);
      return;
    }
    retry(n - 1, func, callback);
  };
  func(cb);
};

export default retry;
