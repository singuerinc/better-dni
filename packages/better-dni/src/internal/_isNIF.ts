export const _isNIF = (v: string) =>
  /^[0-9LK]{8}[TRWAGMYFPDXBNJZSQVHLCKE]{1}$/i.test(v);
