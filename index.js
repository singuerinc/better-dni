const sanitize = value => (!!value ? value : '').toLowerCase();

const _isNIE = v => /^[XYZ]{1}[0-9]{7}[trwagmyfpdxbnjzsqvhlcket]{1}$/i.test(v);
const _isNIF = v => /^[0-9]{8}[trwagmyfpdxbnjzsqvhlcket]{1}$/i.test(v);

/**
 * Returns true if the string is a NIE
 * @param {string} value
 * @returns {boolean}
 */
const isNIE = value => {
  return _isNIE(sanitize(value));
};

/**
 * Returns true if the string is a NIF
 * @param {string} value
 * @returns {boolean}
 */
const isNIF = value => {
  return _isNIF(sanitize(value));
};

/**
 * Returns true if the string is a valid DNI
 * @param {string} value
 * @returns {boolean}
 */
const isValid = value => {
  const dni = sanitize(value); //.replace(/\s_-/, '');

  if (!_isNIF(dni) && !_isNIE(dni)) return false;

  const l = { x: 0, y: 1, z: 2 }[dni[0]] || dni[0];
  const dni_1_to_8 = dni.substr(1, 8);
  const i = +(l + dni_1_to_8, 10) % 23;

  return 'trwagmyfpdxbnjzsqvhlcket'[i] === dni[8];
};

module.exports = {
  sanitize,
  isValid,
  isNIE,
  isNIF
};
