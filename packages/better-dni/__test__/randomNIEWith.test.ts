import { ctrlChar } from "../src/ctrlChar";
import { randomNIEWith } from "../src/randomNIEWith";

describe("#randomNIEWith", () => {
  it("should generate a NIE that ends with E", () => {
    const nie = randomNIEWith("X", "E", 7452129857);
    expect(nie).toBe("X2080280E");
  });

  it("should generate a NIE that ends with C", () => {
    const nie = randomNIEWith("Y", "C", 4452129857);
    expect(nie).toBe("Y2098020C");
  });

  it("should generate always the same NIE given the same seed", () => {
    const nie = randomNIEWith("Z", "G", 5452129857);
    expect(nie).toBe("Z5670557G");
  });

  it("should generate always the same NIE given the negative seed", () => {
    const nie = randomNIEWith("Z", "G", -5452129857);
    expect(nie).toBe("Z7329340G");
  });

  it("should generate a random NIE that ends with G", () => {
    const nie = randomNIEWith("X", "G");
    expect(ctrlChar(nie)).toBe("G");
  });

  it("should generate a random NIE that ends with X", () => {
    const nie = randomNIEWith("X", "X");
    expect(ctrlChar(nie)).toBe("X");
  });

  it("should work with lower case", () => {
    const nie = randomNIEWith("y", "g");
    expect(ctrlChar(nie)).toBe("G");
  });

  it("should work with upper case", () => {
    const nie = randomNIEWith("Z", "C");
    expect(ctrlChar(nie)).toBe("C");
  });

  it("should not generate with invalid letters", () => {
    const nie = randomNIEWith("X", "I");
    expect(nie).toBeNull();
  });

  it("should not generate with invalid letters", () => {
    const nie = randomNIEWith("X", "U");
    expect(nie).toBeNull();
  });

  it("should not generate with invalid letters", () => {
    const nie = randomNIEWith("X", "O");
    expect(nie).toBeNull();
  });

  it("should not generate with invalid letters", () => {
    const nie = randomNIEWith("A", "O");
    expect(nie).toBeNull();
  });
});
