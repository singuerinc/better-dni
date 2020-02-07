import { _letter } from "./internal/_utils";

/**
 * Returns the control letter in upper case
 * for a NIF or NIE with or without control letter
 * @param {string} value
 * @returns {string}
 * @since 1.9.1
 * @example
 * ctrlChar("X9464186P"); // => 'P'
 * ctrlChar("X9464186"); // => 'P'
 * ctrlChar("03118880B"); // => 'B'
 * ctrlChar("03118880"); // => 'B'
 */
const ctrlChar = (y: string): string => {
  // Get a number from 0 - 2 when `y` is a NIE
  const f = "xyzXYZ".indexOf(y[0]) % 3;
  let s = f.toString();
  // Otherwise default to the number (NIF case only)
  if (f === -1) s = y[0];
  // Strip the letters
  const i = `${s}${y.slice(1, 8)}`;
  return _letter(i).toUpperCase();
};

export { ctrlChar };
