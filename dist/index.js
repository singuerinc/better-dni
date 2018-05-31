//  Better DNI v2.1.1
//  https://github.com/singuerinc/better-dni
//  (c) 2017-2018 Nahuel Scotti
//  Better DNI may be freely distributed under the MIT license.

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.betterDni = {})));
}(this, (function (exports) { 'use strict';

  const _isNIE = v => /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]{1}$/i.test(v);

  const _isNIF = v => /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]{1}$/i.test(v);

  /**
   * Returns true if the string is a valid DNI (NIF or NIE)
   * @param {string} value
   * @returns {boolean}
   * @since 1.1.0
   * @example
   * isValid("X9464186P"); // => true
   * isValid("03118880B"); // => true
   */
  const isValid = value => {
    const dni = !value ? '' : value; // lowercase is faster

    if (dni.length !== 9 && !_isNIE(dni) && !_isNIF(dni)) return false;

    let f = 'xyzXYZ'.indexOf(dni[0]) % 3;
    if (f === -1) f = dni[0];
    const i = +(f + dni.slice(1, 8)) % 23;

    return 'trwagmyfpdxbnjzsqvhlcket'.indexOf(dni[8].toLowerCase()) === i;
  };

  function _Random(seed) {
    this._seed = seed % 2147483647;
    if (this._seed <= 0) this._seed += 2147483646;
  }

  _Random.prototype.next = function() {
    return (this._seed = (this._seed * 16807) % 2147483647);
  };

  // _Random :: https://gist.github.com/blixt/f17b47c62508be59987b#file-prng-js

  const _letter = x => 'trwagmyfpdxbnjzsqvhlcke'[+x % 23];
  const _randStrLimit = limit => `${Math.random()}`.slice(-limit);
  const _randFloat = seed => (new _Random(seed).next() - 1) / 2147483646;

  const _char = y => {
    // Get a number from 0 - 2 when `y` is a NIE
    let f = 'xyzXYZ'.indexOf(y[0]) % 3;
    // Otherwise default to the number (NIF case only)
    if (f === -1) f = y[0];
    // Strip the letters
    const i = `${f}${y.slice(1, 8)}`;
    return _letter(i);
  };

  /**
   * Returns the control letter in upper case
   * for a NIF or NIE with or without control letter
   * @param {string} value
   * @returns {string}
   * @since 1.9.1
   * @example
   * ctrlChar("X9464186P"); // => 'P'
   * ctrlChar("X9464186"); // => 'P'
   * ctrlChar("03118880B"); // => 'B'
   * ctrlChar("03118880"); // => 'B'
   */
  const ctrlChar = x => _char(x).toUpperCase();

  /**
   * Returns true if the string is a NIE
   * @param {string} value
   * @returns {boolean}
   * @since 1.0.1
   * @example
   * isNIE("X4108613P"); // => true
   */
  const isNIE = value => {
    return (
      !!value && value.length === 9 && _isNIE(value) && ctrlChar(value) === value[8].toUpperCase()
    );
  };

  /**
   * Returns true if the string is a NIF
   * @param {string} value
   * @returns {boolean}
   * @since 1.0.1
   * @example
   * isNIF("93375221M"); // => true
   */
  const isNIF = value => {
    return (
      !!value && value.length === 9 && _isNIF(value) && ctrlChar(value) === value[8].toUpperCase()
    );
  };

  /**
   * Returns a valid NIF string
   * @returns {string}
   * @since 1.8.1
   * @example
   * randomNIF() // => "93375221M"
   */
  const randomNIF = () => {
    const nn = _randStrLimit(8);
    return nn + _letter(nn);
  };

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
    const l = _letter(+`${r}${nn}`);
    return `${'XYZ'[r]}${nn}${l}`;
  };

  /**
   * Returns a random NIF with a specific letter
   * A seed can be passed as a second parameter and
   * it will always return the same value
   * @returns {string | null}
   * @since 1.11.0
   * @example
   * with random seed
   * randomNIFWith('C'); //=> '95652190C'
   * randomNIFWith('G'); //=> '60869550G'
   *
   * with the same seed
   * randomNIFWith('G', 1); //=> '95652174G'
   * randomNIFWith('G', 1); //=> '95652174G'
   */
  const randomNIFWith = (char, seed = 100000000 * Math.random()) => {
    const lastNum = 'trwagmyfpdxbnjzsqvhlckeTRWAGMYFPDXBNJZSQVHLCKE'.indexOf(char) % 23;

    if (lastNum === -1) return null;

    // TODO: Better calculation
    const n = 99999998 - 4347826 * (Math.floor(_randFloat(seed) * 22) + 1);

    const d = Math.max(0, n) % 23;
    const h = n + (lastNum - d);
    const s = `0${h}`.slice(-8);

    return `${s}${char}`.toUpperCase();
  };

  /**
   * Returns a random NIE with a specific letter
   * A seed can be passed as a third parameter and
   * it will always return the same value
   * @param head {string}
   * @param char {string}
   * @returns {string | null}
   * @since 1.12.0
   * @example
   * with random seed
   * randomNIEWith('Y', 'C'); //=> 'Y2098020C'
   * randomNIEWith('Z', 'G'); //=> 'Z5670557G'
   *
   * with the same seed
   * randomNIEWith('X', 'E', 1); //=> 'X2080280E'
   * randomNIEWith('X', 'E', 1); //=> 'X2080280E'
   */
  const randomNIEWith = (xyz, l, seed = 100000000 * Math.random()) => {
    const headNum = 'xyzXYZ'.indexOf(xyz) % 3;

    if (headNum === -1) return null;

    const lastNum = 'trwagmyfpdxbnjzsqvhlckeTRWAGMYFPDXBNJZSQVHLCKE'.indexOf(l) % 23;

    if (lastNum === -1) return null;

    const headOne = headNum + 1;

    // TODO: Better calculation
    const num = Math.floor(1000000 * headOne + (9999999 - 1000000 * headOne - 23) * _randFloat(seed));

    const b = +`${headNum}${num}`;
    const rest = b % 23;
    const h = b - rest + lastNum;

    const s = `0${h}${l}`.slice(-8);

    return `${xyz}${s}`.toUpperCase();
  };

  exports.isValid = isValid;
  exports.isNIE = isNIE;
  exports.isNIF = isNIF;
  exports.randomNIF = randomNIF;
  exports.randomNIE = randomNIE;
  exports.ctrlChar = ctrlChar;
  exports.randomNIFWith = randomNIFWith;
  exports.randomNIEWith = randomNIEWith;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
