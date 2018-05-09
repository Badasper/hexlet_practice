import path from 'path';

import diff from '../../src/async/diff';

const getFixturePath = fileName => path.join(__dirname, '../__fixtures__/async', fileName);

describe('Diff', () => {
  it('should work', (done) => {
    diff(getFixturePath('file1'), getFixturePath('file2'), (err, data) => {
      expect(data).toEqual([]);
      done();
    });
  });

  it('should work 2', (done) => {
    diff(getFixturePath('file1'), getFixturePath('file3'), (err, data) => {
      expect(data).toEqual([[null, 'hello, world']]);
      done();
    });
  });

  it('should work 3', (done) => {
    diff(getFixturePath('file3'), getFixturePath('file2'), (err, data) => {
      expect(data).toEqual([['hello, world', null]]);
      done();
    });
  });

  it('should work 4', (done) => {
    diff(getFixturePath('file4'), getFixturePath('file5'), (err, data) => {
      const result = [
        ['text', 'ext'],
        ['', 'haha'],
        ['ehu', ''],
        ['', 'text'],
        ['aha', null],
      ];
      expect(data).toEqual(result);
      done();
    });
  });

  it('should work 5', (done) => {
    diff(getFixturePath('file5'), getFixturePath('file4'), (err, data) => {
      const result = [
        ['ext', 'text'],
        ['haha', ''],
        ['', 'ehu'],
        ['text', ''],
        [null, 'aha'],
      ];
      expect(data).toEqual(result);
      done();
    });
  });

  it('shouldn\'t work 1', (done) => {
    diff('non-existent file', getFixturePath('file5'), (err) => {
      expect(err.errno).toBe(-2);
      done();
    });
  });

  it('shouldn\'t work 2', (done) => {
    diff(getFixturePath('file4'), 'non-existent file', (err) => {
      expect(err.code).toEqual('ENOENT');
      done();
    });
  });
});
