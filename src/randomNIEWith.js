import { _Random } from './internal/_utils';
import { ctrlChar } from './ctrlChar';

const idxOf = x => y => x.indexOf(y);
const letterAsNum = idxOf('XYZ');
const lastIndex = idxOf('TRWAGMYFPDXBNJZSQVHLCKE');
const upper = x => x.toUpperCase();
const randFloat = seed => (new _Random(seed).next() - 1) / 2147483646;

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
 * randomNIEWith('X'. 'S'); //=> 'X4481726S'
 * randomNIEWith('Y'. 'F'); //=> 'Y5684121F'
 *
 * with the same seed
 * randomNIEWith('X', 'G', 1); //=> '95652174G'
 * randomNIEWith('X', 'G', 1); //=> '95652174G'
 */
const randomNIEWith = (xyz, y, seed = 100000000 * Math.random()) => {
  // first nie letter
  const head = upper(xyz);
  const headNum = letterAsNum(head);

  if (headNum === -1) return null;

  // last ctrl letter
  const last = upper(y);
  const lastNum = lastIndex(last);

  if (lastNum === -1) return null;

  const headOne = headNum + 1;

  // random nie
  const num = Math.floor(1000000 * headOne + (9999999 - 1000000 * headOne - 23) * randFloat(seed));
  const rest = +(headNum + '' + num) % 23;
  const h = +(headNum + '' + num) - rest + lastNum;

  const s = '0' + h + last;
  const a = s.substr(-9);

  return head + a.substr(-8);
};

export { randomNIEWith };
