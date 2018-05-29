function _Random(seed) {
  this._seed = seed % 2147483647;
  if (this._seed <= 0) this._seed += 2147483646;
}

_Random.prototype.next = function() {
  return (this._seed = (this._seed * 16807) % 2147483647);
};

// _Random :: https://gist.github.com/blixt/f17b47c62508be59987b#file-prng-js

const _idxOf = x => y => x.indexOf(y);
const _headAsNum = _idxOf('XYZ');
const _lastIndex = _idxOf('TRWAGMYFPDXBNJZSQVHLCKE');
const _upper = x => x.toUpperCase();

const _letter = x => 'trwagmyfpdxbnjzsqvhlcke'[+x % 23];
const _randStrLimit = limit => ('' + Math.random()).substr(-limit);
const _randFloat = seed => (new _Random(seed).next() - 1) / 2147483646;

export { _letter, _randStrLimit, _Random, _headAsNum, _lastIndex, _upper, _randFloat };
