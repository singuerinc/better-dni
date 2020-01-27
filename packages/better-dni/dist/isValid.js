"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _isNIE_1 = require("./internal/_isNIE");
var _isNIF_1 = require("./internal/_isNIF");
var isValid = function (value) {
    var dni = !value ? "" : value;
    if (dni.length !== 9 && !_isNIE_1._isNIE(dni) && !_isNIF_1._isNIF(dni)) {
        return false;
    }
    var f = "xyzXYZ".indexOf(dni[0]) % 3;
    var s = f.toString();
    if (f === -1) {
        s = dni[0];
    }
    var i = +(s + dni.slice(1, 8)) % 23;
    return "trwagmyfpdxbnjzsqvhlcket".indexOf(dni[8].toLowerCase()) === i;
};
exports.isValid = isValid;
//# sourceMappingURL=isValid.js.map