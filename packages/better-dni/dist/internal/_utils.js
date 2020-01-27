"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function random(seed) {
    var _seed = seed % 2147483647;
    if (_seed <= 0)
        _seed += 2147483646;
    return {
        next: function () {
            _seed = (_seed * 16807) % 2147483647;
            return _seed;
        }
    };
}
var _letter = function (x) { return "trwagmyfpdxbnjzsqvhlcke"[+x % 23]; };
exports._letter = _letter;
var _randStrLimit = function (limit) { return ("" + Math.random()).slice(-limit); };
exports._randStrLimit = _randStrLimit;
var _randFloat = function (seed) { return (random(seed).next() - 1) / 2147483646; };
exports._randFloat = _randFloat;
//# sourceMappingURL=_utils.js.map