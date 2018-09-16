import { _randStrLimit, _letter } from "./internal/_utils";

/**
 * Returns a valid NIE string
 * @returns {string}
 * @since 1.8.1
 * @example
 * randomNIE() // => "X4108613P"
 */
const randomNIE = () => {
  const r = Math.floor(Math.random() * 3);
  const nn = _randStrLimit(7);
  const l = _letter(+`${r}${nn}`).toUpperCase();
  return `${"XYZ"[r]}${nn}${l}`;
};

export { randomNIE };
