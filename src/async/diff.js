import fs from 'fs';

const compare = (data1, data2) => {
  const lines1 = data1.split('\n').slice(0, -1);
  const lines2 = data2.split('\n').slice(0, -1);

  const lines = lines1.length > lines2.length ? lines1 : lines2;
  return lines.reduce((acc, value, idx) => {
    if (lines1[idx] !== lines2[idx]) {
      return [
        ...acc,
        [
          lines1[idx] !== undefined ? lines1[idx] : null,
          lines2[idx] !== undefined ? lines2[idx] : null,
        ],
      ];
    }
    return acc;
  }, []);
};

export default (filepath1, filepath2, callback) => {
  fs.readFile(filepath1, 'utf8', (err1, data1) => {
    if (err1) {
      callback(err1);
      return;
    }
    fs.readFile(filepath2, 'utf8', (err2, data2) => {
      if (err2) {
        callback(err2);
        return;
      }
      callback(null, compare(data1, data2));
    });
  });
};
