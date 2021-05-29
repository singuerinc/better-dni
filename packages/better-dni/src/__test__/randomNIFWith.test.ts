import { ctrlChar } from "../ctrlChar";
import { randomNIFWith } from "../randomNIFWith";

describe("#randomNIFWith", () => {
  it("should generate a NIF that ends with E", () => {
    const nif = randomNIFWith("E", 7452129857);
    expect(nif).toBe("86956536E");
  });

  it("should generate a NIF that ends with C", () => {
    const nif = randomNIFWith("C", 4452129857);
    expect(nif).toBe("95652190C");
  });

  it("should generate always the same NIF given the same seed", () => {
    const nif = randomNIFWith("G", 5452129857);
    expect(nif).toBe("60869550G");
  });

  it("should generate a random NIF that ends with G", () => {
    const nif = randomNIFWith("G");
    if (nif) {
      expect(ctrlChar(nif)).toBe("G");
    } else {
      throw new Error();
    }
  });

  it("should work with lower case", () => {
    const nif = randomNIFWith("g");
    if (nif) {
      expect(ctrlChar(nif)).toBe("G");
    }
  });

  it("should work with upper case", () => {
    const nif = randomNIFWith("C");
    if (nif) {
      expect(ctrlChar(nif)).toBe("C");
    } else {
      throw new Error();
    }
  });

  it("should not generate with invalid letters", () => {
    const nif = randomNIFWith("I");
    expect(nif).toBeNull();
  });

  it("should not generate with invalid letters", () => {
    const nif = randomNIFWith("U");
    expect(nif).toBeNull();
  });

  it("should not generate with invalid letters", () => {
    const nif = randomNIFWith("O");
    expect(nif).toBeNull();
  });
});
