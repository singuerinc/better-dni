const _letter = x => 'trwagmyfpdxbnjzsqvhlcket'[+x % 23];
const _randStrLimit = limit => ('' + Math.random()).substr(-limit);

export { _letter, _randStrLimit };
