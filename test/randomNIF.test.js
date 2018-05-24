const assert = require('assert');
const { isNIF, randomNIF, isValid } = require('../dist/index');

describe('#randomNIF', () => {
  it('should return a random nif', () => {
    const nif = randomNIF();
    assert.equal(isNIF(nif), true);
  });

  it('should create 20 valid items', () => {
    const list = Array(20)
      .fill(0)
      .map(randomNIF);

    assert.equal(list.every(x => isValid(x) && isNIF(x)), true);
  });
});
