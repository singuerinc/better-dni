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
// `${Math.random()}` can be short ("0.25") or exponential ("1e-7"),
// so build the digits from a number instead of slicing its string
// (the leading 1 keeps the zeros on the left, then it's sliced off)
const _randStrLimit = (limit: number): string =>
  `${10 ** limit + Math.floor(Math.random() * 10 ** limit)}`.slice(1);
const _randFloat = (seed: number): number =>
  (random(seed).next() - 1) / 2147483646;

export { _letter, _randStrLimit, _randFloat };
