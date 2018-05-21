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

const sanitize = memoize(value =>
  (value + '' || '')
    .split('')
    .map(c => (/[-_\s]/.test(c) ? '' : c.toUpperCase()))
    .join('')
);

const nie = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
const nif = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
const toLetter = memoize(l => ({ X: 0, Y: 1, Z: 2 }[l]));
const replaceLetter = memoize(x => x.replace(/^[XYZ]/i, toLetter));

/**
 * Returns true if the string is a NIE
 * @param {string} value
 * @returns {boolean}
 */
const isNIE = memoize(value => {
  return nie.test(sanitize(value));
});

/**
 * Returns true if the string is a NIF
 * @param {string} value
 * @returns {boolean}
 */
const isNIF = memoize(value => {
  return nif.test(sanitize(value));
});

/**
 * Returns true if the string is a valid DNI
 * @param {string} value
 * @returns {boolean}
 */
const isValid = memoize(value => {
  const dni = sanitize(value);

  if (!isNIF(dni) && !isNIE(dni)) {
    return false;
  }

  const x = replaceLetter(dni);
  const charIndex = parseInt(x.substr(0, 8), 10) % 23;

  return 'TRWAGMYFPDXBNJZSQVHLCKET'.charAt(charIndex) === x[8];
});

module.exports = {
  isValid,
  isNIE,
  isNIF
};
