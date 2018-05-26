const assert = require('assert');
const { randomNIFWith, ctrlChar } = require('../dist/index');

describe('#randomNIFWith', () => {
  it('should generate a NIF that ends with E', () => {
    const rand = randomNIFWith('E', 7452129857);
    assert.equal(rand, '86956536E');
  });

  it('should generate a NIF that ends with C', () => {
    const rand = randomNIFWith('C', 4452129857);
    assert.equal(rand, '95652190C');
  });

  it('should generate always the same NIF given the same seed', () => {
    const rand = randomNIFWith('G', 5452129857);
    assert.equal(rand, '60869550G');
  });

  it('should generate a random NIF that ends with G', () => {
    const rand = randomNIFWith('G');
    assert.equal(ctrlChar(rand), 'g');
  });

  it('should work with lower case', () => {
    const rand = randomNIFWith('g');
    assert.equal(ctrlChar(rand), 'g');
  });

  it('should work with upper case', () => {
    const rand = randomNIFWith('C');
    assert.equal(ctrlChar(rand), 'c');
  });
});
