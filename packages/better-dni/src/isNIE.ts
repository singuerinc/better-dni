import { ctrlChar } from "./ctrlChar";
import { _isNIE } from "./internal/_isNIE";

/**
 * Returns true if the string is a NIE
 * @param {string} value
 * @returns {boolean}
 * @since 1.0.1
 * @example
 * isNIE("X4108613P"); // => true
 */
const isNIE = (value: string): boolean => {
  return (
    !!value &&
    value.length === 9 &&
    _isNIE(value) &&
    ctrlChar(value) === value[8].toUpperCase()
  );
};

export { isNIE };
