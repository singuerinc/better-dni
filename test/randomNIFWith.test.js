const assert = require("assert");
const { randomNIFWith, ctrlChar } = require("../dist/index");

describe("#randomNIFWith", () => {
  it("should generate a NIF that ends with E", () => {
    const nif = randomNIFWith("E", 7452129857);
    assert.equal(nif, "86956536E");
  });

  it("should generate a NIF that ends with C", () => {
    const nif = randomNIFWith("C", 4452129857);
    assert.equal(nif, "95652190C");
  });

  it("should generate always the same NIF given the same seed", () => {
    const nif = randomNIFWith("G", 5452129857);
    assert.equal(nif, "60869550G");
  });

  it("should generate a random NIF that ends with G", () => {
    const nif = randomNIFWith("G");
    assert.equal(ctrlChar(nif), "G");
  });

  it("should work with lower case", () => {
    const nif = randomNIFWith("g");
    assert.equal(ctrlChar(nif), "G");
  });

  it("should work with upper case", () => {
    const nif = randomNIFWith("C");
    assert.equal(ctrlChar(nif), "C");
  });

  it("should not generate with invalid letters", () => {
    const nif = randomNIFWith("I");
    assert.equal(nif, null);
  });

  it("should not generate with invalid letters", () => {
    const nif = randomNIFWith("U");
    assert.equal(nif, null);
  });

  it("should not generate with invalid letters", () => {
    const nif = randomNIFWith("O");
    assert.equal(nif, null);
  });
});
