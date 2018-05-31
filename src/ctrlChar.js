import { _char } from './internal/_char';

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
const ctrlChar = x => _char(x).toUpperCase();

export { ctrlChar };
