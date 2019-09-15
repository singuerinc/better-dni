const assert = require("assert");
const { ctrlChar } = require("../dist/index");

describe("#ctrlChar", () => {
  it("should return the letter for a NIE in upper case with control letter", () => {
    assert.equal(ctrlChar("x9464186p"), "P");
  });

  it("should return the letter for a NIE in upper case with control letter", () => {
    assert.equal(ctrlChar("X9464186P"), "P");
  });

  it("should return the letter for a NIE in upper case without control letter", () => {
    assert.equal(ctrlChar("x9464186"), "P");
  });

  it("should return the letter for a NIF in upper case without control letter", () => {
    assert.equal(ctrlChar("X9464186"), "P");
  });

  it("should return the letter for a NIF in upper case with control letter", () => {
    assert.equal(ctrlChar("03118880b"), "B");
  });

  it("should return the letter for a NIF without control letter", () => {
    assert.equal(ctrlChar("03118880"), "B");
  });
});
