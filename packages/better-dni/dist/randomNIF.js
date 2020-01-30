"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _utils_1 = require("./internal/_utils");
var randomNIF = function () {
    var nn = _utils_1._randStrLimit(8);
    return nn + _utils_1._letter(nn).toUpperCase();
};
exports.randomNIF = randomNIF;
//# sourceMappingURL=randomNIF.js.map