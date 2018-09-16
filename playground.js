const { isValid, randomNIE, randomNIEWith, randomNIFWith } = require("./dist/index");

const nies = Array(15000)
  .fill(0)
  // .map(x => randomNIFWith('g', 1))
  // .map(x => randomNIEWith('x', 'g'))
  // .map(x => randomNIEWith('y', 'g'))
  // .map(x => randomNIEWith('z', 'g'))
  // .map(x => randomNIFWith('a'))
  .map((x) => randomNIFWith("E"))
  .map((x, i) => {
    const v = isValid(x);
    console.log(i, x, v);
    if (!v) {
      throw new Error("ups!");
    }
    return x;
  });

// console.log(nies);
