const addControlChar = x => x + 'TRWAGMYFPDXBNJZSQVHLCKET'[+x % 23];

/**
 * Returns a valid NIF string
 * @returns {string}
 * @example
 * randomNIF() // => "93375221M"
 */
const randomNIF = () => {
  const nif = rn => ('' + rn).substr(-8);
  const rn = Math.random();
  return addControlChar(nif(rn));
};

/**
 * Returns a valid NIE string
 * @returns {string}
 * @example
 * randomNIE() // => "X4108613P"
 */
const randomNIE = () => {
  const firstNIEChar = i => ['X', 'Y', 'Z'][i];
  const nif = rn => ('' + rn).substr(-7);
  const rn = Math.random();
  const r = Math.floor(rn * 3);
  return firstNIEChar(r) + addControlChar(nif(rn));
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
