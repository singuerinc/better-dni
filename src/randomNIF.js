import { _randStrLimit, _letter, _sum } from './internal/_utils';

/**
 * Returns a valid NIF string
 * @returns {string}
 * @example
 * randomNIF() // => "93375221M"
 */
const randomNIF = () => {
  const nn = _randStrLimit(8);
  return nn + _letter(_sum(nn.split('')));
};

export { randomNIF };
