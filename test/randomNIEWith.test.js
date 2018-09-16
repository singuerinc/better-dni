const assert = require("assert");
const { randomNIEWith, ctrlChar } = require("../dist/index");

describe("#randomNIEWith", () => {
  it("should generate a NIE that ends with E", () => {
    const nie = randomNIEWith("X", "E", 7452129857);
    assert.equal(nie, "X2080280E");
  });

  it("should generate a NIE that ends with C", () => {
    const nie = randomNIEWith("Y", "C", 4452129857);
    assert.equal(nie, "Y2098020C");
  });

  it("should generate always the same NIE given the same seed", () => {
    const nie = randomNIEWith("Z", "G", 5452129857);
    assert.equal(nie, "Z5670557G");
  });

  it("should generate always the same NIE given the negative seed", () => {
    const nie = randomNIEWith("Z", "G", -5452129857);
    assert.equal(nie, "Z7329340G");
  });

  it("should generate a random NIE that ends with G", () => {
    const nie = randomNIEWith("X", "G");
    assert.equal(ctrlChar(nie), "G");
  });

  it("should generate a random NIE that ends with X", () => {
    const nie = randomNIEWith("X", "X");
    assert.equal(ctrlChar(nie), "X");
  });

  it("should work with lower case", () => {
    const nie = randomNIEWith("y", "g");
    assert.equal(ctrlChar(nie), "G");
  });

  it("should work with upper case", () => {
    const nie = randomNIEWith("Z", "C");
    assert.equal(ctrlChar(nie), "C");
  });

  it("should not generate with invalid letters", () => {
    const nie = randomNIEWith("X", "I");
    assert.equal(nie, null);
  });

  it("should not generate with invalid letters", () => {
    const nie = randomNIEWith("X", "U");
    assert.equal(nie, null);
  });

  it("should not generate with invalid letters", () => {
    const nie = randomNIEWith("X", "O");
    assert.equal(nie, null);
  });

  it("should not generate with invalid letters", () => {
    const nie = randomNIEWith("A", "O");
    assert.equal(nie, null);
  });
});
