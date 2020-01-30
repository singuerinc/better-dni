export const _isNIE = (v: string) =>
  /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]{1}$/i.test(v);
