import { _letter } from './_utils';

const _char = y => {
  // Get a number from 0 - 2 when `y` is a NIE
  let f = 'xyzXYZ'.indexOf(y[0]) % 3;
  // Otherwise default to the number (NIF case only)
  if (f === -1) f = y[0];
  // Strip the letters
  const i = `${f}${y.slice(1, 8)}`;
  return _letter(i);
};

export { _char };
