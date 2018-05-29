import { _lastIndex, _upper, _randFloat } from './internal/_utils';

/**
 * Returns a random NIF with a specific letter
 * A seed can be passed as a second parameter and
 * it will always return the same value
 * @returns {string | null}
 * @since 1.11.0
 * @example
 * with random seed
 * randomNIFWith('C'); //=> '95652190C'
 * randomNIFWith('G'); //=> '60869550G'
 *
 * with the same seed
 * randomNIFWith('G', 1); //=> '95652174G'
 * randomNIFWith('G', 1); //=> '95652174G'
 */
const randomNIFWith = (char, seed = 100000000 * Math.random()) => {
  const upper = _upper(char);
  const i = _lastIndex(upper);

  if (i === -1) return null;

  const n = 99999998 - 4347826 * (Math.floor(_randFloat(seed) * 22) + 1);
  const d = Math.max(0, n) % 23;
  const h = n + (i - d);
  const s = ('00000000' + h).substr(-8);

  return s + upper;
};

export { randomNIFWith };
