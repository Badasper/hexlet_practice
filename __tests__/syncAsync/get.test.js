import solution from '../../src/syncAsync/get';

describe('Request', () => {
  it('set 0', (done) => {
    const link = 'http://localhost:8080/';
    const title = 'Википедия';
    solution(title, link, (err, result) => {
      expect(1).toBe(1);
      done(err);
    });
  });
});
