const { isValid, randomNIE, randomNIEWith, randomNIFWith } = require('./dist/index');

const nies = Array(500)
  .fill(0)
  // .map(x => randomNIFWith('g', 1))
  // .map(x => randomNIEWith('x', 'g'))
  // .map(x => randomNIEWith('y', 'g'))
  .map(x => randomNIEWith('z', 'g'))
  .map((x, i) => {
    console.log(i, x, isValid(x));
    return x;
  });

// console.log(nies);
