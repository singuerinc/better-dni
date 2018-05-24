import { _isNIE } from './internal/_isNIE';

/**
 * Returns true if the string is a NIE
 * @param {string} value
 * @returns {boolean}
 * @example
 * isNIE("X4108613P"); // => true
 */
const isNIE = value => {
  return !!value && _isNIE(value);
};

export { isNIE };
