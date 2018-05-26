import { version } from './package.json';

const banner =
  '//  Better DNI v' +
  version +
  '\n' +
  '//  https://github.com/singuerinc/better-dni\n' +
  '//  (c) 2017-' +
  new Date().getFullYear() +
  ' Nahuel Scotti\n' +
  '//  Better DNI may be freely distributed under the MIT license.\n';

export default {
  input: 'src/index.js',
  output: {
    banner,
    format: 'umd',
    file: 'dist/index.js',
    name: 'betterDni'
  },
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**'
  }
};
