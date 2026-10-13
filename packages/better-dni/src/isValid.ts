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
  if (!value || value.length !== 9) {
    return false;
  }

  // A digit, an NIE prefix (X, Y, Z -> 0, 1, 2)
  // or a NIF with K, L or M, which uses only its 7 digits
  let n = value.charCodeAt(0) - 48;
  if (n < 0 || n > 9) {
    const f = "xyzXYZklmKLM".indexOf(value[0]);
    if (f === -1) return false;
    n = f < 6 ? f % 3 : 0;
  }

  // 7 digits, read into the number as we go (no regex, no string concat)
  for (let k = 1; k < 8; k++) {
    const d = value.charCodeAt(k) - 48;
    if (d < 0 || d > 9) return false;
    n = n * 10 + d;
  }

  return "trwagmyfpdxbnjzsqvhlcke".indexOf(value[8].toLowerCase()) === n % 23;
};

export { isValid };
