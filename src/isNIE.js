import { _isNIE } from './internal/_isNIE';
import { _upper } from './internal/_utils';
import { ctrlChar } from './ctrlChar';

/**
 * Returns true if the string is a NIE
 * @param {string} value
 * @returns {boolean}
 * @since 1.0.1
 * @example
 * isNIE("X4108613P"); // => true
 */
const isNIE = value => {
  return !!value && value.length === 9 && _isNIE(value) && ctrlChar(value) === _upper(value[8]);
};

export { isNIE };
