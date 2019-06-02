//  Better DNI v3.0.1
//  https://github.com/singuerinc/better-dni
//  (c) 2017-2019 Nahuel Scotti
//  Better DNI may be freely distributed under the MIT license.

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.betterDni = {}));
}(this, function (exports) { 'use strict';

  var _isNIE = function _isNIE(v) {
    return /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]{1}$/i.test(v);
  };

  var _isNIF = function _isNIF(v) {
    return /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]{1}$/i.test(v);
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

  var isValid = function isValid(value) {
    var dni = !value ? "" : value; // lowercase is faster

    if (dni.length !== 9 && !_isNIE(dni) && !_isNIF(dni)) {
      return false;
    }

    var f = "xyzXYZ".indexOf(dni[0]) % 3;

    if (f === -1) {
      f = dni[0];
    }

    var i = +(f + dni.slice(1, 8)) % 23;
    return "trwagmyfpdxbnjzsqvhlcket".indexOf(dni[8].toLowerCase()) === i;
  };

  function _Random(seed) {
    this._seed = seed % 2147483647;
    if (this._seed <= 0) this._seed += 2147483646;
  }

  _Random.prototype.next = function () {
    return this._seed = this._seed * 16807 % 2147483647;
  }; // _Random :: https://gist.github.com/blixt/f17b47c62508be59987b#file-prng-js


  var _letter = function _letter(x) {
    return "trwagmyfpdxbnjzsqvhlcke"[+x % 23];
  };

  var _randStrLimit = function _randStrLimit(limit) {
    return "".concat(Math.random()).slice(-limit);
  };

  var _randFloat = function _randFloat(seed) {
    return (new _Random(seed).next() - 1) / 2147483646;
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

  var ctrlChar = function ctrlChar(y) {
    // Get a number from 0 - 2 when `y` is a NIE
    var f = "xyzXYZ".indexOf(y[0]) % 3; // Otherwise default to the number (NIF case only)

    if (f === -1) f = y[0]; // Strip the letters

    var i = "".concat(f).concat(y.slice(1, 8));
    return _letter(i).toUpperCase();
  };

  /**
   * Returns true if the string is a NIE
   * @param {string} value
   * @returns {boolean}
   * @since 1.0.1
   * @example
   * isNIE("X4108613P"); // => true
   */

  var isNIE = function isNIE(value) {
    return !!value && value.length === 9 && _isNIE(value) && ctrlChar(value) === value[8].toUpperCase();
  };

  /**
   * Returns true if the string is a NIF
   * @param {string} value
   * @returns {boolean}
   * @since 1.0.1
   * @example
   * isNIF("93375221M"); // => true
   */

  var isNIF = function isNIF(value) {
    return !!value && value.length === 9 && _isNIF(value) && ctrlChar(value) === value[8].toUpperCase();
  };

  /**
   * Returns a valid NIF string
   * @returns {string}
   * @since 1.8.1
   * @example
   * randomNIF() // => "93375221M"
   */

  var randomNIF = function randomNIF() {
    var nn = _randStrLimit(8);

    return nn + _letter(nn).toUpperCase();
  };

  /**
   * Returns a valid NIE string
   * @returns {string}
   * @since 1.8.1
   * @example
   * randomNIE() // => "X4108613P"
   */

  var randomNIE = function randomNIE() {
    var r = Math.floor(Math.random() * 3);

    var nn = _randStrLimit(7);

    var l = _letter(+"".concat(r).concat(nn)).toUpperCase();

    return "".concat("XYZ"[r]).concat(nn).concat(l);
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

  var randomNIFWith = function randomNIFWith(char) {
    var seed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100000000 * Math.random();
    var lastNum = "trwagmyfpdxbnjzsqvhlckeTRWAGMYFPDXBNJZSQVHLCKE".indexOf(char) % 23;

    if (lastNum === -1) {
      return null;
    } // TODO: Better calculation


    var n = 99999998 - 4347826 * (Math.floor(_randFloat(seed) * 22) + 1);
    var d = Math.max(0, n) % 23;
    var h = n + (lastNum - d);
    var s = "0".concat(h).slice(-8);
    return "".concat(s).concat(char).toUpperCase();
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

  var randomNIEWith = function randomNIEWith(xyz, l) {
    var seed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100000000 * Math.random();
    var headNum = "xyzXYZ".indexOf(xyz) % 3;

    if (headNum === -1) {
      return null;
    }

    var lastNum = "trwagmyfpdxbnjzsqvhlckeTRWAGMYFPDXBNJZSQVHLCKE".indexOf(l) % 23;

    if (lastNum === -1) {
      return null;
    }

    var headOne = headNum + 1; // TODO: Better calculation

    var num = Math.floor(1000000 * headOne + (9999999 - 1000000 * headOne - 23) * _randFloat(seed));
    var b = +"".concat(headNum).concat(num);
    var rest = b % 23;
    var h = b - rest + lastNum;
    var s = "0".concat(h).concat(l).slice(-8);
    return "".concat(xyz).concat(s).toUpperCase();
  };

  /**
   * Returns a "clean" dni string removing spaces, dashes, etc.
   * @param {string} value
   * @returns {string}
   * @since 2.2.0
   * @example
   * normalize(" x-9464186_p   "); // => "X9464186P"
   */
  var normalize = function normalize(str) {
    return str.replace(/[-_\s]/gi, "").toUpperCase();
  };

  exports.ctrlChar = ctrlChar;
  exports.isNIE = isNIE;
  exports.isNIF = isNIF;
  exports.isValid = isValid;
  exports.normalize = normalize;
  exports.randomNIE = randomNIE;
  exports.randomNIEWith = randomNIEWith;
  exports.randomNIF = randomNIF;
  exports.randomNIFWith = randomNIFWith;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.js.map
