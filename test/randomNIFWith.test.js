const assert = require('assert');
const { randomNIFWith, ctrlChar } = require('../dist/index');

describe.only('#randomNIFWith', () => {
  it('should generate a NIF that ends with E', () => {
    const rand = randomNIFWith('E', 0.772417452129857);
    assert.equal(rand, '87018015E');
  });

  it('should generate a NIF that ends with C', () => {
    const rand = randomNIFWith('C', 0.818239152342028);
    assert.equal(rand, '86247881C');
  });

  it('should generate always the same NIF given the same seed', () => {
    const rand = randomNIFWith('G', 0.7497704970831218);
    assert.equal(rand, '87398624G');
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
