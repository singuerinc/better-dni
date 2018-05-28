const assert = require('assert');
const { randomNIEWith, ctrlChar } = require('../dist/index');

describe('#randomNIEWith', () => {
  it('should generate a NIF that ends with E', () => {
    const nif = randomNIEWith('X', 'E', 7452129857);
    assert.equal(nif, 'X2080280E');
  });

  it('should generate a NIF that ends with C', () => {
    const nif = randomNIEWith('Y', 'C', 4452129857);
    assert.equal(nif, 'Y2098020C');
  });

  it('should generate always the same NIF given the same seed', () => {
    const nif = randomNIEWith('Z', 'G', 5452129857);
    assert.equal(nif, 'Z5670557G');
  });

  it('should generate always the same NIF given the negative seed', () => {
    const nif = randomNIEWith('Z', 'G', -5452129857);
    assert.equal(nif, 'Z7329340G');
  });

  it('should generate a random NIF that ends with G', () => {
    const nif = randomNIEWith('X', 'G');
    assert.equal(ctrlChar(nif), 'g');
  });

  it('should work with lower case', () => {
    const nif = randomNIEWith('Y', 'g');
    assert.equal(ctrlChar(nif), 'g');
  });

  it('should work with upper case', () => {
    const nif = randomNIEWith('Z', 'C');
    assert.equal(ctrlChar(nif), 'c');
  });

  it('should not generate with invalid letters', () => {
    const nif = randomNIEWith('X', 'I');
    assert.equal(nif, null);
  });

  it('should not generate with invalid letters', () => {
    const nif = randomNIEWith('X', 'U');
    assert.equal(nif, null);
  });

  it('should not generate with invalid letters', () => {
    const nif = randomNIEWith('X', 'O');
    assert.equal(nif, null);
  });

  it('should not generate with invalid letters', () => {
    const nif = randomNIEWith('A', 'O');
    assert.equal(nif, null);
  });
});
