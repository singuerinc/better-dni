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
 * isValid("K1111111G"); // => true
 */
const isValid = (value: string): boolean => {
  const dni = !value ? "" : value; // lowercase is faster

  if (dni.length !== 9 && !_isNIE(dni) && !_isNIF(dni)) {
    return false;
  }

  const f = "xyzXYZ".indexOf(dni[0]) % 3;
  let s: string = f.toString();

  if (f === -1) {
    // a NIF with K, L or M uses only its 7 digits
    s = "klmKLM".includes(dni[0]) ? "0" : dni[0];
  }

  const i = +(s + dni.slice(1, 8)) % 23;

  return "trwagmyfpdxbnjzsqvhlcket".indexOf(dni[8].toLowerCase()) === i;
};

export { isValid };
