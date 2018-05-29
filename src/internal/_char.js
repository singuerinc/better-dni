import { _letter } from './_utils';

const _char = y => {
  const f = { X: '0', Y: '1', Z: '2' }[y[0]] || y[0];
  const i = f + '' + y.substr(1, 7);
  return _letter(i);
};

export { _char };
