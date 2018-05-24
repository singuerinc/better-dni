const assert = require('assert');
const { isNIF } = require('../dist/index');

describe('#isNIF', () => {
  it('should return true if is nif', () => {
    assert.equal(isNIF('00000000A'), true);
  });

  it('should return if is not nif', () => {
    assert.equal(isNIF('0000000AA'), false);
  });

  it('should not validate long strings that contains valid nifs', () => {
    assert.equal(isNIF('00000000aaaaaaaaaaa'), false);
  });

  it('should handle empty strings', () => {
    assert.equal(isNIF(''), false);
  });

  it('should handle null values', () => {
    assert.equal(isNIF(null), false);
  });

  it('should handle undefined values', () => {
    assert.equal(isNIF(undefined), false);
  });
});
