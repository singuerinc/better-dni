import { _isNIE } from "./internal/_isNIE";
import { ctrlChar } from "./ctrlChar";

/**
 * Returns true if the string is a NIE
 * @param {string} value
 * @returns {boolean}
 * @since 1.0.1
 * @example
 * isNIE("X4108613P"); // => true
 */
const isNIE = (value) => {
  return (
    !!value && value.length === 9 && _isNIE(value) && ctrlChar(value) === value[8].toUpperCase()
  );
};

export { isNIE };
