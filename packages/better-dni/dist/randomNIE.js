"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _utils_1 = require("./internal/_utils");
var randomNIE = function () {
    var r = Math.floor(Math.random() * 3);
    var nn = _utils_1._randStrLimit(7);
    var l = _utils_1._letter("" + r + nn).toUpperCase();
    return "" + "XYZ"[r] + nn + l;
};
exports.randomNIE = randomNIE;
//# sourceMappingURL=randomNIE.js.map