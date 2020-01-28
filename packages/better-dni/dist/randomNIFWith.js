"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _utils_1 = require("./internal/_utils");
var randomNIFWith = function (char, seed) {
    if (seed === void 0) { seed = 100000000 * Math.random(); }
    var lastNum = "trwagmyfpdxbnjzsqvhlckeTRWAGMYFPDXBNJZSQVHLCKE".indexOf(char) % 23;
    if (lastNum === -1) {
        return null;
    }
    var n = 99999998 - 4347826 * (Math.floor(_utils_1._randFloat(seed) * 22) + 1);
    var d = Math.max(0, n) % 23;
    var h = n + (lastNum - d);
    var s = ("0" + h).slice(-8);
    return ("" + s + char).toUpperCase();
};
exports.randomNIFWith = randomNIFWith;
//# sourceMappingURL=randomNIFWith.js.map