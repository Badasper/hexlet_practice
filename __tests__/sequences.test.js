import { l, toString as listToString } from 'hexlet-pairs-data';
import { firstNElements, zip, sameParity, isSafeQueens, union, flatten, sort } from '../src/sequences/other';

describe('First N elements of sequence', () => {
  test('set 1', () => {
    expect(listToString(firstNElements(3, l()))).toBe(listToString(l()));
  });

  test('set 2', () => {
    expect(listToString(firstNElements(3, l(1, 2)))).toBe(listToString(l(1, 2)));
  });

  test('set 3', () => {
    expect(listToString(firstNElements(1, l(1, 2)))).toBe(listToString(l(1)));
  });
});


describe('Zip', () => {
  it('set 1', () => {
    const list1 = l();
    const list2 = l();

    const result = zip(list1, list2);
    expect(listToString(result)).toBe('()');
  });

  it('set 2', () => {
    const list1 = l(1, 5, 3, 8, 9);
    const list2 = l(2, 3, 2, 1);

    const result = zip(list1, list2);
    expect(listToString(result)).toBe('((1, 2), (5, 3), (3, 2), (8, 1))');
  });

  it('set 3', () => {
    const list1 = l(2, 3, 2, 1);
    const list2 = l(1, 5, 3, 8, 9);

    const result = zip(list1, list2);
    expect(listToString(result)).toBe('((2, 1), (3, 5), (2, 3), (1, 8))');
  });

  it('set 4', () => {
    const list1 = l(8, 3, 5, 1);
    const list2 = l(1, 2, 3, 2);

    const result = zip(list1, list2);
    expect(listToString(result)).toBe('((8, 1), (3, 2), (5, 3), (1, 2))');
  });
});
describe('Same Parity as first eleme', () => {
  test('SameParity', () => {
    const result = sameParity(l(5, 0, 1, -3, 10));
    expect(listToString(result)).toBe(listToString(l(5, 1, -3)));

    const result2 = sameParity(l(2, 0, 1, -3, 10, -2));
    expect(listToString(result2)).toBe(listToString(l(2, 0, 10, -2)));

    const result3 = sameParity(l(-1, 0, 1, -3, 10, -2));
    expect(listToString(result3)).toBe(listToString(l(-1, 1, -3)));

    const result4 = sameParity(l());
    expect(listToString(result4)).toBe(listToString(l()));
  });
});

describe('Is Safe Queens', () => {
  it('safe', () => {
    const queens1 = l(2, 4, 1, 3);
    expect(isSafeQueens(queens1)).toBe(true);

    const queens2 = l(3, 6, 2, 5, 1, 4);
    expect(isSafeQueens(queens2)).toBe(true);

    const queens3 = l(1, 5, 8, 6, 3, 7, 2, 4);
    expect(isSafeQueens(queens3)).toBe(true);
  });

  it('not safe', () => {
    const queens1 = l(2, 1, 3);
    expect(isSafeQueens(queens1)).toBe(false);

    const queens2 = l(1, 2, 3, 4, 5, 6);
    expect(isSafeQueens(queens2)).toBe(false);

    const queens3 = l(1, 5, 8, 6, 3, 7, 2, 8);
    expect(isSafeQueens(queens3)).toBe(false);

    const queens4 = l(3, 3, 3, 3, 3, 3);
    expect(isSafeQueens(queens4)).toBe(false);
  });
});

describe('Union', () => {
  it('set 1', () => {
    const list1 = l();
    const list2 = l();

    const result = union(list1, list2);
    expect(listToString(result)).toBe('()');
  });

  it('set 2', () => {
    const list1 = l(1, 5, 3, 5, 8, 9);
    const list2 = l(2, 3, 2, 1, 7);

    const result = union(list1, list2);
    expect(listToString(result)).toBe(listToString(l(1, 5, 3, 8, 9, 2, 7)));
  });

  it('set 3', () => {
    const list1 = l(2, 3, 2, 1, 7);
    const list2 = l(1, 5, 3, 5, 8, 9);

    const result = union(list1, list2);
    expect(listToString(result)).toBe(listToString(l(2, 3, 1, 7, 5, 8, 9)));
  });
});

describe('Flatten', () => {
  it('set 1', () => {
    const list = l();

    expect(listToString(flatten(list))).toBe('()');
  });

  it('set 2', () => {
    const list = l(1, 2, l(3, 5), l(l(4, 3), 2));

    expect(listToString(flatten(list))).toBe('(1, 2, 3, 5, 4, 3, 2)');
  });

  it('set 3', () => {
    const list = l(l(1, l(5), l(), l(l(-3, 'hi'))), 'string', 10, l(l(l(5))));

    expect(listToString(flatten(list))).toBe('(1, 5, -3, hi, string, 10, 5)');
  });
});


describe('Sort', () => {
  it('set 1', () => {
    const result = sort(l());
    expect(listToString(result)).toBe(listToString(l()));

    const result2 = sort(l(5, -3, 2, 10, 4, 4, 5));
    expect(listToString(result2)).toBe(listToString(l(-3, 2, 4, 4, 5, 5, 10)));

    const result3 = sort(l(3, 3, 0, -1, 0, 4, -5));
    expect(listToString(result3)).toBe(listToString(l(-5, -1, 0, 0, 3, 3, 4)));
  });
});
