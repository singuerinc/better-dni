const assert = require("assert");
const { isNIF, randomNIF, isValid, ctrlChar } = require("../dist/index");

describe("#randomNIF", () => {
  it("should return a random nif", () => {
    const nif = randomNIF();
    assert.equal(isNIF(nif), true);
  });

  it("should return the ctrl char in upper case", () => {
    const nif = randomNIF();
    const char = ctrlChar(nif);
    assert.equal(char, char.toUpperCase());
  });

  it("should create 20 valid items", () => {
    const list = Array(20)
      .fill(0)
      .map(randomNIF);

    assert.equal(list.every(isNIF), true);
  });
});
