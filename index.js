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

const sanitize = value =>
  (value + '' || '')
    .split('')
    .map(c => (/[-_\s]/.test(c) ? '' : c.toUpperCase()))
    .join('');

const toLetter = l => ({ X: 0, Y: 1, Z: 2 }[l]);
const chartToLetter = (char, i) => (i === 0 ? toLetter(char) || char : char);
const replaceLetter = word =>
  word
    .split('')
    .map(chartToLetter)
    .join('');
const _isNIE = v => /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/.test(v);
const _isNIF = v => /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/.test(v);

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
  // const dni = sanitize(value);
  const dni = value;

  if (!_isNIF(dni) && !_isNIE(dni)) {
    // return false;
  }

  const l = toLetter(dni[0]) || dni[0];
  const first = dni.slice(1, 8);
  const x = l + first;
  const charIndex = parseInt(x, 10) % 23;

  return 'TRWAGMYFPDXBNJZSQVHLCKET'[charIndex] === dni[8];
};

module.exports = {
  isValid,
  isNIE,
  isNIF
};
