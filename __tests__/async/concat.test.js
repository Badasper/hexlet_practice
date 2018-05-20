import concat from '../../src/async/concat';

describe('#concat', () => {
  it('set 1', (done) => {
    const coll = [[1, 1, 1], [2, 2, 2], [3, 3, 3]];
    concat(coll, (item, callback) => {
      callback(null, item);
    }, (err, result) => {
      expect(result).toEqual(coll.reduce((acc, item) => acc.concat(item)));
      done();
    });
  });

  it('set 2', (done) => {
    const callOrder = [];
    const iteratee = (x, cb) => {
      setTimeout(() => {
        callOrder.push(x);
        let y = x;
        const r = [];
        while (y > 0) {
          r.push(y);
          y -= 1;
        }
        cb(null, r);
      }, x * 25);
    };
    concat([1, 3, 2], iteratee, (err, results) => {
      expect(results).toEqual([1, 2, 1, 3, 2, 1]);
      expect(callOrder).toEqual([1, 2, 3]);
      expect(err === null).toBeTruthy();
      done();
    });
  });

  it('set 3 error', (done) => {
    const iteratee = (x, cb) => {
      cb(new Error('test error'));
    };
    concat([1, 2, 3], iteratee, (err) => {
      expect(err).toBeInstanceOf(Error);
      done();
    });
  });

  it('should work 2', (done) => {
    const coll = [];
    concat(coll, () => {
    }, () => {
      done();
    });
  });
});
