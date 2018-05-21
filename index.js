const CHARS = 'TRWAGMYFPDXBNJZSQVHLCKET';

const memoize = fn => {
  let cache = {};
  return n => {
    if (n in cache) {
      return cache[n];
    } else {
      let result = fn(n);
      cache[n] = result;
      return result;
    }
  };
};

const _sanitize = value =>
  String(value || '')
    .trim()
    .toUpperCase();
// .replace(/[-_\s]/g, '');

const sanitize = memoize(_sanitize);

const nie = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
const nif = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;

/**
 * Returns true if the string is a NIE
 * @param {string} value
 * @returns {boolean}
 */
const _isNIE = value => {
  return nie.test(sanitize(value));
};

const isNIE = memoize(_isNIE);

/**
 * Returns true if the string is a NIF
 * @param {string} value
 * @returns {boolean}
 */
const _isNIF = value => {
  return nif.test(sanitize(value));
};

const isNIF = memoize(_isNIF);

/**
 * Returns true if the string is a valid DNI
 * @param {string} value
 * @returns {boolean}
 */
const isValid = value => {
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
  isValid,
  isNIE,
  isNIF
};
