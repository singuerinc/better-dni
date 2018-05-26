import { _Random } from './internal/_utils';

/**
 * Returns a random NIF with a specific letter
 * A seed can be passed as a second parameter and
 * it will always return the same value
 * @returns {string}
 * @since 1.11.0
 * @example
 * w/ random seed
 * randomNIFWith('C'); //=> '93401916C'
 * randomNIFWith('C'); //=> '89346257C'
 *
 * w/ the same seed
 * randomNIFWith('C', 0.818239152342028); //=> '86247881C'
 * randomNIFWith('C', 0.818239152342028); //=> '86247881C'
 */
const randomNIFWith = (char, seed = Math.random()) => {
  const upper = char.toUpperCase();
  const i = 'TRWAGMYFPDXBNJZSQVHLCKE'.indexOf(upper);
  const r = new _Random(seed).next() / 100000;
  const rand = Math.floor(r * 4347826);
  const num = 99999998 - 23 * rand;
  const dni = String(num + i).padEnd(8, '0');
  return dni + upper;
};

export { randomNIFWith };
