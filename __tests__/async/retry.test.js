import retry from '../../src/async/retry';

describe('#retry', () => {
  it('should finish with error', (done) => {
    let calledTimes = 0;
    retry(3, (callback) => {
      calledTimes += 1;
      callback(calledTimes);
    }, (err) => {
      expect(err).toBe(3);
      expect(calledTimes).toBe(3);
      done();
    });
  });

  it('should call final callback if err is empty', (done) => {
    let calledTimes = 0;
    retry(6, (callback) => {
      calledTimes += 1;
      if (calledTimes === 4) {
        callback(null, calledTimes);
        return;
      }
      callback(calledTimes);
    }, (err, result) => {
      expect(result).toBe(4);
      expect(calledTimes).toBe(4);
      done();
    });
  });
});
