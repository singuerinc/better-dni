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
  const dni = (!!value ? value : '').toLowerCase();

  if (!value && !_isNIF(dni) && !_isNIE(dni)) return false;

  const f = { x: 0, y: 1, z: 2 }[dni[0]] || dni[0];
  const dni_1_to_7 = dni.substr(1, 7);
  const i = +(f + dni_1_to_7) % 23;

  return 'trwagmyfpdxbnjzsqvhlcket'[i] === dni[8];
};

module.exports = {
  sanitize,
  isValid,
  isNIE,
  isNIF
};
