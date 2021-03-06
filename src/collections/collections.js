const intersection = (arr1, arr2) => {
  const setArr1 = new Set(arr1);
  const setArr2 = new Set(arr2);
  return [...setArr1].filter(item => setArr2.has(item));
};

const findOdd = (arr) => {
  const numbers = arr.reduce((acc, item) => {
    if (acc.has(item)) {
      const newValue = acc.get(item) + 1;
      return acc.set(item, newValue);
    }
    return acc.set(item, 1);
  }, new Map());
  const ans = Array.from(numbers.keys()).filter(item => numbers.get(item) % 2 > 0);
  return ans[0];
};

const chunk = (arr, num) => {
  const chunked = arr.reduce((acc, item, idx, arrInternal) => {
    if (idx % num === 0) {
      return [...acc, arrInternal.slice(idx, idx + num)];
    }
    return acc;
  }, []);
  return chunked;
};

const difference = (arr1, arr2) => {
  const setArr2 = new Set(arr2);
  return arr1.filter(item => !setArr2.has(item));
};

export { intersection, findOdd, chunk, difference };
