import { _randStrLimit, _letter } from './internal/_utils';

/**
 * Returns a valid NIE string
 * @returns {string}
 * @example
 * randomNIE() // => "X4108613P"
 */
const randomNIE = () => {
  const r = Math.floor(Math.random() * 3);
  const nn = _randStrLimit(7);
  return ['X', 'Y', 'Z'][r] + nn + _letter(+(r + '' + nn));
};

export { randomNIE };
