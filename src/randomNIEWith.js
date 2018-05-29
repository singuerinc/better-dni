import { _lastIndex, _headAsNum, _upper, _randFloat } from './internal/_utils';
import { ctrlChar } from './ctrlChar';

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
  // first nie letter
  const head = _upper(xyz);
  const headNum = _headAsNum(head);

  if (headNum === -1) return null;

  // last ctrl letter
  const last = _upper(l);
  const lastNum = _lastIndex(last);

  if (lastNum === -1) return null;

  const headOne = headNum + 1;

  // random nie
  const num = Math.floor(1000000 * headOne + (9999999 - 1000000 * headOne - 23) * _randFloat(seed));
  const rest = +(headNum + '' + num) % 23;
  const h = +(headNum + '' + num) - rest + lastNum;

  const s = '0' + h + last;
  const a = s.substr(-9);

  return head + a.substr(-8);
};

export { randomNIEWith };
