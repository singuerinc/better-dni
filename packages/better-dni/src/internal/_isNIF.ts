export const _isNIF = (v: string): boolean =>
  /^(?:[0-9]|K)[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]{1}$/i.test(v);
