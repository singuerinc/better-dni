const assert = require("assert");
const {
  isNIE,
  isNIF,
  randomNIE,
  randomNIF,
  isValid,
  ctrlChar,
  randomNIFWith
} = require("../dist/index");

describe("api", () => {
  it("should export isValid", () => {
    assert.ok(isValid);
  });

  it("should export isNIE", () => {
    assert.ok(isNIE);
  });

  it("should export isNIF", () => {
    assert.ok(isNIF);
  });

  it("should export randomNIE", () => {
    assert.ok(randomNIE);
  });

  it("should export randomNIF", () => {
    assert.ok(randomNIF);
  });

  it("should export ctrlChar", () => {
    assert.ok(ctrlChar);
  });

  it("should export randomNIFWith", () => {
    assert.ok(randomNIFWith);
  });
});
