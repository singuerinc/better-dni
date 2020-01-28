"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _utils_1 = require("./internal/_utils");
var ctrlChar = function (y) {
    var f = "xyzXYZ".indexOf(y[0]) % 3;
    var s = f.toString();
    if (f === -1)
        s = y[0];
    var i = "" + s + y.slice(1, 8);
    return _utils_1._letter(i).toUpperCase();
};
exports.ctrlChar = ctrlChar;
//# sourceMappingURL=ctrlChar.js.map