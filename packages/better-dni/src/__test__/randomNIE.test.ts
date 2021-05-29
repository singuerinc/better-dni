import { ctrlChar } from "../ctrlChar";
import { isNIE } from "../isNIE";
import { randomNIE } from "../randomNIE";

describe("#randomNIE", () => {
  it("should return a random nie", () => {
    const nie = randomNIE();
    expect(isNIE(nie)).toBe(true);
  });

  it("should return the ctrl char in upper case", () => {
    const nie = randomNIE();
    const char = ctrlChar(nie);
    expect(char).toBe(char.toUpperCase());
  });

  it("should create 20 valid items", () => {
    const list = Array(20).fill(0).map(randomNIE);

    expect(list.every(isNIE)).toBe(true);
  });
});
