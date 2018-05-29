import { _isNIF } from './internal/_isNIF';
import { _upper } from './internal/_utils';
import { ctrlChar } from './ctrlChar';

/**
 * Returns true if the string is a NIF
 * @param {string} value
 * @returns {boolean}
 * @since 1.0.1
 * @example
 * isNIF("93375221M"); // => true
 */
const isNIF = value => {
  return !!value && value.length === 9 && _isNIF(value) && ctrlChar(value) === _upper(value[8]);
};

export { isNIF };
