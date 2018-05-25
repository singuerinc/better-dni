import { _isNIE } from './internal/_isNIE';
import { _isNIF } from './internal/_isNIF';
import { _char } from './internal/_char';

/**
 * Returns true if the string is a valid DNI (NIF or NIE)
 * @param {string} value
 * @returns {boolean}
 * @since 1.1.0
 * @example
 * isValid("X9464186P"); // => true
 * isValid("03118880B"); // => true
 */
const isValid = value => {
  const dni = (!value ? '' : value).toLowerCase();
  if (dni.length !== 9 && !_isNIE(dni) && !_isNIF(dni)) return false;
  return _char(dni) === dni[8];
};

export { isValid };
