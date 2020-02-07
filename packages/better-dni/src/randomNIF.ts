import { _letter, _randStrLimit } from "./internal/_utils";

/**
 * Returns a valid NIF string
 * @returns {string}
 * @since 1.8.1
 * @example
 * randomNIF() // => "93375221M"
 */
const randomNIF = (): string => {
  const nn = _randStrLimit(8);
  return nn + _letter(nn).toUpperCase();
};

export { randomNIF };
