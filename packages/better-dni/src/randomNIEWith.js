import { _randFloat } from "./internal/_utils";
import { ctrlChar } from "./ctrlChar";

/**
 * Returns a random NIE with a specific letter
 * A seed can be passed as a third parameter and
 * it will always return the same value
 * @param head {string}
 * @param char {string}
 * @returns {string | null}
 * @since 1.12.0
 * @example
 * with random seed
 * randomNIEWith('Y', 'C'); //=> 'Y2098020C'
 * randomNIEWith('Z', 'G'); //=> 'Z5670557G'
 *
 * with the same seed
 * randomNIEWith('X', 'E', 1); //=> 'X2080280E'
 * randomNIEWith('X', 'E', 1); //=> 'X2080280E'
 */
const randomNIEWith = (xyz, l, seed = 100000000 * Math.random()) => {
  const headNum = "xyzXYZ".indexOf(xyz) % 3;

  if (headNum === -1) {
    return null;
  }

  const lastNum = "trwagmyfpdxbnjzsqvhlckeTRWAGMYFPDXBNJZSQVHLCKE".indexOf(l) % 23;

  if (lastNum === -1) {
    return null;
  }

  const headOne = headNum + 1;

  // TODO: Better calculation
  const num = Math.floor(1000000 * headOne + (9999999 - 1000000 * headOne - 23) * _randFloat(seed));

  const b = +`${headNum}${num}`;
  const rest = b % 23;
  const h = b - rest + lastNum;

  const s = `0${h}${l}`.slice(-8);

  return `${xyz}${s}`.toUpperCase();
};

export { randomNIEWith };
