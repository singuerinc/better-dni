export const _isNIF = (v: string): boolean =>
  /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]{1}$/i.test(v);
