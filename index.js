const CHARS = 'TRWAGMYFPDXBNJZSQVHLCKET';

const sanitize = value => {
  return String(value || '')
    .trim()
    .toUpperCase()
    .replace(/[-_\s]/g, '');
};

/**
 * Returns true if the string is a NIE
 * @param {string} value
 * @returns {boolean}
 */
const isNIE = value => {
  return new RegExp(`^[XYZ]{1}[0-9]{7}[${CHARS}]{1}$`).test(sanitize(value));
};

/**
 * Returns true if the string is a NIF
 * @param {string} value
 * @returns {boolean}
 */
const isNIF = value => {
  return new RegExp(`^[0-9]{8}[${CHARS}]{1}$`).test(sanitize(value));
};

/**
 * Returns true if the string is a valid DNI
 * @param {string} value
 * @returns {boolean}
 */
const valid = value => {
  const str = sanitize(value);

  if (!isNIF(str) && !isNIE(str)) {
    return false;
  }

  const toLetter = m => ({ X: 0, Y: 1, Z: 2 }[m]);
  const x = str.replace(/^[XYZ]/i, toLetter);

  const letter = str.substr(-1);
  const charIndex = parseInt(x.substr(0, 8), 10) % 23;

  return CHARS.charAt(charIndex) === letter;
};

module.exports = {
  valid,
  isNIE,
  isNIF
};
