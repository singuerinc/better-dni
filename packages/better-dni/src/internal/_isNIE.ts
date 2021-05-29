export const _isNIE = (v: string): boolean =>
  /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]{1}$/i.test(v);
