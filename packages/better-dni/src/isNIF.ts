import { ctrlChar } from "./ctrlChar";
import { _isNIF } from "./internal/_isNIF";

/**
 * Returns true if the string is a NIF
 * @param {string} value
 * @returns {boolean}
 * @since 1.0.1
 * @example
 * isNIF("93375221M"); // => true
 */
const isNIF = (value: string): boolean => {
  return (
    !!value &&
    value.length === 9 &&
    _isNIF(value) &&
    ctrlChar(value) === value[8].toUpperCase()
  );
};

export { isNIF };
