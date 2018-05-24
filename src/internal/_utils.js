const _letter = x => 'TRWAGMYFPDXBNJZSQVHLCKET'[+x % 23];
const _add = (acc, x) => acc + x;
const _sum = numbers => numbers.reduce(_add, 0);
const _randStrLimit = limit => ('' + Math.random()).substr(-limit);

export { _letter, _sum, _randStrLimit };
