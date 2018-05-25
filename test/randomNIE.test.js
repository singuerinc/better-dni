const assert = require('assert');
const { isNIE, randomNIE, isValid } = require('../dist/index');

describe('#randomNIE', () => {
  it('should return a random nie', () => {
    const nie = randomNIE();
    assert.equal(isNIE(nie), true);
  });

  it('should create 20 valid items', () => {
    const list = Array(20)
      .fill(0)
      .map(randomNIE);

    assert.equal(list.every(isNIE), true);
  });
});
