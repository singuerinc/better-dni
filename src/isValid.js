import { _isNIE } from './internal/_isNIE';
import { _isNIF } from './internal/_isNIF';

/**
 * Returns true if the string is a valid DNI (NIF or NIE)
 * @param {string} value
 * @returns {boolean}
 * @example
 * isValid("X4108613P"); // => true
 */
const isValid = value => {
  const dni = (!value ? '' : value).toLowerCase();

  if (dni.length !== 9 && !_isNIE(dni) && !_isNIF(dni)) return false;

  const f = { x: '0', y: '1', z: '2' }[dni[0]] || dni[0];
  const dni_1_to_7 = dni.substr(1, 7);
  const i = +(f + dni_1_to_7) % 23;

  return 'trwagmyfpdxbnjzsqvhlcket'[i] === dni[8];
};

export { isValid };
