function random(seed: number) {
  let _seed = seed % 2147483647;
  if (_seed <= 0) _seed += 2147483646;
  return {
    next: () => {
      _seed = (_seed * 16807) % 2147483647;
      return _seed;
    },
  };
}

// random :: https://gist.github.com/blixt/f17b47c62508be59987b#file-prng-js

const _letter = (x: string): string => "trwagmyfpdxbnjzsqvhlcke"[+x % 23];
const _randStrLimit = (limit: number): string =>
  `${Math.random()}`.slice(-limit);
const _randFloat = (seed: number): number =>
  (random(seed).next() - 1) / 2147483646;

export { _letter, _randStrLimit, _randFloat };
