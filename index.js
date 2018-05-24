const letter = x => 'TRWAGMYFPDXBNJZSQVHLCKET'[+x % 23];
const add = (acc, x) => acc + x;
const sum = numbers => numbers.reduce(add, 0);
const randStrLimit = limit => ('' + Math.random()).substr(-limit);

/**
 * Returns a valid NIF string
 * @returns {string}
 * @example
 * randomNIF() // => "93375221M"
 */
const randomNIF = () => {
  const nn = randStrLimit(8);
  return nn + letter(sum(nn.split('')));
};

/**
 * Returns a valid NIE string
 * @returns {string}
 * @example
 * randomNIE() // => "X4108613P"
 */
const randomNIE = () => {
  const r = Math.floor(Math.random() * 3);
  const nn = randStrLimit(7);
  return ['X', 'Y', 'Z'][r] + nn + letter(sum([r, ...nn.split('')]));
};

const _isNIE = v => /^[XYZ]{1}[0-9]{7}[trwagmyfpdxbnjzsqvhlcket]{1}$/i.test(v);
const _isNIF = v => /^[0-9]{8}[trwagmyfpdxbnjzsqvhlcket]{1}$/i.test(v);

/**
 * Returns true if the string is a NIE
 * @param {string} value
 * @returns {boolean}
 * @example
 * isNIE("X4108613P"); // => true
 */
const isNIE = value => {
  return !!value && _isNIE(value);
};

/**
 * Returns true if the string is a NIF
 * @param {string} value
 * @returns {boolean}
 * @example
 * isNIF("93375221M"); // => true
 */
const isNIF = value => {
  return !!value && _isNIF(value);
};

/**
 * Returns true if the string is a valid DNI (NIF or NIE)
 * @param {string} value
 * @returns {boolean}
 * @example
 * isValid("X4108613P"); // => true
 */
const isValid = value => {
  const dni = (!value ? '' : value).toLowerCase();

  if (dni.length !== 9 && !_isNIF(dni) && !_isNIE(dni)) return false;

  const f = { x: '0', y: '1', z: '2' }[dni[0]] || dni[0];
  const dni_1_to_7 = dni.substr(1, 7);
  const i = +(f + dni_1_to_7) % 23;

  return 'trwagmyfpdxbnjzsqvhlcket'[i] === dni[8];
};

module.exports = {
  isValid,
  isNIE,
  isNIF,
  randomNIF,
  randomNIE
};
