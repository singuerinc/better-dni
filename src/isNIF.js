import { _isNIF } from './internal/_isNIF';

/**
 * Returns true if the string is a NIF
 * @param {string} value
 * @returns {boolean}
 * @example
 * isNIF("93375221M"); // => true
 */
const isNIF = value => {
  return !!value && _isNIF(value);
};

export { isNIF };
