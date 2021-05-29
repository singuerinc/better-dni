import { isValid } from "./src/isValid";
import { randomNIFWith } from "./src/randomNIFWith";

const list = Array(15000)
  .fill(0)
  // .map(x => randomNIFWith('g', 1))
  // .map(x => randomNIEWith('x', 'g'))
  // .map(x => randomNIEWith('y', 'g'))
  // .map(x => randomNIEWith('z', 'g'))
  // .map(x => randomNIFWith('a'))
  .map(() => randomNIFWith("E"))
  .map((x) => {
    if (typeof x === "string") {
      const v = isValid(x);
      if (!v) {
        throw new Error("ups!");
      }
    }
    return x;
  });

console.log(list);
