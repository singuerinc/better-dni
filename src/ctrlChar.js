import { _char } from './internal/_char';

/**
 * Returns the control letter in lower case
 * for a NIF or NIE with or without control letter
 * @param {string} value
 * @returns {string}
 * @example
 * ctrlChar("X9464186P"); // => 'p'
 * ctrlChar("X9464186"); // => 'p'
 * ctrlChar("03118880B"); // => 'b'
 * ctrlChar("03118880"); // => 'b'
 */
const ctrlChar = x => _char(x.toLowerCase());

export { ctrlChar };
