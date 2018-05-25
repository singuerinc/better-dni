import { _letter } from './_utils';

const _char = y => {
  const f = { x: '0', y: '1', z: '2' }[y[0]] || y[0];
  const i = f + '' + y.substr(1, 7);
  return _letter(i);
};

export { _char };
