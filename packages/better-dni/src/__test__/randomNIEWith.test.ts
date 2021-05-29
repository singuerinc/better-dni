import { ctrlChar } from "../ctrlChar";
import { randomNIEWith } from "../randomNIEWith";

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
    if (nie) {
      expect(ctrlChar(nie)).toBe("G");
    } else {
      throw new Error();
    }
  });

  it("should generate a random NIE that ends with X", () => {
    const nie = randomNIEWith("X", "X");
    if (nie) {
      expect(ctrlChar(nie)).toBe("X");
    } else {
      throw new Error();
    }
  });

  it("should work with lower case", () => {
    const nie = randomNIEWith("y", "g");
    if (nie) {
      expect(ctrlChar(nie)).toBe("G");
    } else {
      throw new Error();
    }
  });

  it("should work with upper case", () => {
    const nie = randomNIEWith("Z", "C");
    if (nie) {
      expect(ctrlChar(nie)).toBe("C");
    } else {
      throw new Error();
    }
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
