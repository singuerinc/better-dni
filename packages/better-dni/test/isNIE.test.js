const assert = require("assert");
const { isNIE } = require("../dist/index");

describe("#isNIE", () => {
  it("should return if is nie with X", () => {
    assert.equal(isNIE("x9464186p"), true);
    assert.equal(isNIE("X9464186P"), true);
  });

  it("should return if is nie with Y", () => {
    assert.equal(isNIE("y1715871q"), true);
    assert.equal(isNIE("Y1715871Q"), true);
  });

  it("should return if is nie with Z", () => {
    assert.equal(isNIE("z0078471t"), true);
    assert.equal(isNIE("Z0078471T"), true);
  });

  it("should return false if is nie with 0", () => {
    assert.equal(isNIE("09464186P"), false);
  });

  it("should return false if is nie with 1", () => {
    assert.equal(isNIE("11715871Q"), false);
  });

  it("should return false if is nie with 2", () => {
    assert.equal(isNIE("20078471T"), false);
  });

  it("should return if is not nie", () => {
    assert.equal(isNIE("Z00A000AA"), false);
  });

  it("should handle empty strings", () => {
    assert.equal(isNIE(""), false);
  });

  it("should not validate long strings that contain valid nies", () => {
    assert.equal(isNIE("x9464186paaaaaaaaaaaaaaa"), false);
  });

  it("should handle null values", () => {
    assert.equal(isNIE(null), false);
  });

  it("should handle undefined values", () => {
    assert.equal(isNIE(undefined), false);
  });
});
