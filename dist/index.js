//  Better DNI v1.9.1
//  https://github.com/singuerinc/better-dni
//  (c) 2017-2018 Nahuel Scotti
//  Better DNI may be freely distributed under the MIT license.

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.betterDni = {})));
}(this, (function (exports) { 'use strict';

  const _isNIE = v => /^[XYZ]{1}[0-9]{7}[trwagmyfpdxbnjzsqvhlcket]{1}$/i.test(v);

  const _isNIF = v => /^[0-9]{8}[trwagmyfpdxbnjzsqvhlcket]{1}$/i.test(v);

  const _letter = x => 'trwagmyfpdxbnjzsqvhlcket'[+x % 23];
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
   * @example
   * randomNIE() // => "X4108613P"
   */
  const randomNIE = () => {
    const r = Math.floor(Math.random() * 3);
    const nn = _randStrLimit(7);
    return ['X', 'Y', 'Z'][r] + nn + _letter(+(r + '' + nn));
  };

  exports.isValid = isValid;
  exports.isNIE = isNIE;
  exports.isNIF = isNIF;
  exports.randomNIF = randomNIF;
  exports.randomNIE = randomNIE;
  exports.ctrlChar = ctrlChar;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
