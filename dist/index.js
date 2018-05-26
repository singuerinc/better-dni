//  Better DNI v1.11.2
//  https://github.com/singuerinc/better-dni
//  (c) 2017-2018 Nahuel Scotti
//  Better DNI may be freely distributed under the MIT license.

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.betterDni = {})));
}(this, (function (exports) { 'use strict';

  const _isNIE = v => /^[XYZ]{1}[0-9]{7}[trwagmyfpdxbnjzsqvhlcke]{1}$/i.test(v);

  const _isNIF = v => /^[0-9]{8}[trwagmyfpdxbnjzsqvhlcke]{1}$/i.test(v);

  function _Random(seed) {
    this._seed = seed % 2147483647;
    if (this._seed <= 0) this._seed += 2147483646;
  }

  _Random.prototype.next = function() {
    return (this._seed = (this._seed * 16807) % 2147483647);
  };

  // _Random :: https://gist.github.com/blixt/f17b47c62508be59987b#file-prng-js

  const _letter = x => 'trwagmyfpdxbnjzsqvhlcke'[+x % 23];
  const _randStrLimit = limit => ('' + Math.random()).substr(-limit);

  const _char = y => {
    const f = { x: '0', y: '1', z: '2' }[y[0]] || y[0];
    const i = f + '' + y.substr(1, 7);
    return _letter(i);
  };

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
    const dni = (!value ? '' : value).toLowerCase();
    if (dni.length !== 9 && !_isNIE(dni) && !_isNIF(dni)) return false;
    return _char(dni) === dni[8];
  };

  /**
   * Returns the control letter in lower case
   * for a NIF or NIE with or without control letter
   * @param {string} value
   * @returns {string}
   * @since 1.9.1
   * @example
   * ctrlChar("X9464186P"); // => 'p'
   * ctrlChar("X9464186"); // => 'p'
   * ctrlChar("03118880B"); // => 'b'
   * ctrlChar("03118880"); // => 'b'
   */
  const ctrlChar = x => _char(x.toLowerCase());

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
      !!value && value.length === 9 && _isNIE(value) && ctrlChar(value) === value[8].toLowerCase()
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
      !!value && value.length === 9 && _isNIF(value) && ctrlChar(value) === value[8].toLowerCase()
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
    return ['X', 'Y', 'Z'][r] + nn + _letter(+(r + '' + nn));
  };

  /**
   * Returns a random NIF with a specific letter
   * A seed can be passed as a second parameter and
   * it will always return the same value
   * @returns {string}
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
    const upper = char.toUpperCase();
    const i = 'TRWAGMYFPDXBNJZSQVHLCKE'.indexOf(upper);
    if (i === -1) return null;
    const rand = (new _Random(seed).next() - 1) / 2147483646;
    const n = 99999998 - 4347826 * (Math.floor(rand * 22) + 1);
    const d = Math.max(0, n) % 23;
    const h = n + (i - d);
    const s = ('00000000' + h).substr(-8);
    return s + upper;
  };

  exports.isValid = isValid;
  exports.isNIE = isNIE;
  exports.isNIF = isNIF;
  exports.randomNIF = randomNIF;
  exports.randomNIE = randomNIE;
  exports.ctrlChar = ctrlChar;
  exports.randomNIFWith = randomNIFWith;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
