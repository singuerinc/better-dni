const assert = require('assert');
const { isNIE } = require('../dist/index');

describe('#isNIE', () => {
  it('should return if is nie with X', () => {
    assert.equal(isNIE('x0000000a'), true);
  });

  it('should return if is nie with Y', () => {
    assert.equal(isNIE('y0000000a'), true);
  });

  it('should return if is nie with Z', () => {
    assert.equal(isNIE('Z0000000A'), true);
  });

  it('should return if is not nie', () => {
    assert.equal(isNIE('Z000000AA'), false);
  });

  it('should handle empty strings', () => {
    assert.equal(isNIE(''), false);
  });

  it('should not validate long strings that contain valid nies', () => {
    assert.equal(isNIE('x0000000aaaaaaaaaaaaaaaa'), false);
  });

  it('should handle null values', () => {
    assert.equal(isNIE(null), false);
  });

  it('should handle undefined values', () => {
    assert.equal(isNIE(undefined), false);
  });
});
