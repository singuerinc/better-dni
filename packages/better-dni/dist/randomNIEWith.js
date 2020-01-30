"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _utils_1 = require("./internal/_utils");
var randomNIEWith = function (xyz, l, seed) {
    if (seed === void 0) { seed = 100000000 * Math.random(); }
    var headNum = "xyzXYZ".indexOf(xyz) % 3;
    if (headNum === -1) {
        return null;
    }
    var lastNum = "trwagmyfpdxbnjzsqvhlckeTRWAGMYFPDXBNJZSQVHLCKE".indexOf(l) % 23;
    if (lastNum === -1) {
        return null;
    }
    var headOne = headNum + 1;
    var num = Math.floor(1000000 * headOne + (9999999 - 1000000 * headOne - 23) * _utils_1._randFloat(seed));
    var b = +("" + headNum + num);
    var rest = b % 23;
    var h = b - rest + lastNum;
    var s = ("0" + h + l).slice(-8);
    return ("" + xyz + s).toUpperCase();
};
exports.randomNIEWith = randomNIEWith;
//# sourceMappingURL=randomNIEWith.js.map