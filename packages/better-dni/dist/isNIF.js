"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _isNIF_1 = require("./internal/_isNIF");
var ctrlChar_1 = require("./ctrlChar");
var isNIF = function (value) {
    return (!!value &&
        value.length === 9 &&
        _isNIF_1._isNIF(value) &&
        ctrlChar_1.ctrlChar(value) === value[8].toUpperCase());
};
exports.isNIF = isNIF;
//# sourceMappingURL=isNIF.js.map