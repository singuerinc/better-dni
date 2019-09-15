const assert = require("assert");
const { isNIF } = require("../dist/index");

describe("#isNIF", () => {
  it("should return true if is nif", () => {
    assert.equal(isNIF("48124311P"), true);
    assert.equal(isNIF("75967948Y"), true);
    assert.equal(isNIF("03118880B"), true);
    assert.equal(isNIF("68785585Z"), true);
  });

  it("should return if is not nif", () => {
    assert.equal(isNIF("0000000AA"), false);
  });

  it("should not validate long strings that contains valid nifs", () => {
    assert.equal(isNIF("00000000aaaaaaaaaaa"), false);
  });

  it("should handle empty strings", () => {
    assert.equal(isNIF(""), false);
  });

  it("should handle null values", () => {
    assert.equal(isNIF(null), false);
  });

  it("should handle undefined values", () => {
    assert.equal(isNIF(undefined), false);
  });
});
