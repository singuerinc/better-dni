import { _isNIE } from "./internal/_isNIE";
import { _isNIF } from "./internal/_isNIF";

/**
 * Returns true if the string is a valid DNI (NIF or NIE)
 * @param {string} value
 * @returns {boolean}
 * @since 1.1.0
 * @example
 * isValid("X9464186P"); // => true
 * isValid("03118880B"); // => true
 */
const isValid = (value) => {
  const dni = !value ? "" : value; // lowercase is faster

  if (dni.length !== 9 && !_isNIE(dni) && !_isNIF(dni)) {
    return false;
  }

  let f = "xyzXYZ".indexOf(dni[0]) % 3;

  if (f === -1) {
    f = dni[0];
  }

  const i = +(f + dni.slice(1, 8)) % 23;

  return "trwagmyfpdxbnjzsqvhlcket".indexOf(dni[8].toLowerCase()) === i;
};

export { isValid };
