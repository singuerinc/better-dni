"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _isNIE_1 = require("./internal/_isNIE");
var ctrlChar_1 = require("./ctrlChar");
var isNIE = function (value) {
    return (!!value &&
        value.length === 9 &&
        _isNIE_1._isNIE(value) &&
        ctrlChar_1.ctrlChar(value) === value[8].toUpperCase());
};
exports.isNIE = isNIE;
//# sourceMappingURL=isNIE.js.map