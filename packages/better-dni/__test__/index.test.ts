import {
  isNIE,
  isNIF,
  randomNIE,
  randomNIF,
  isValid,
  ctrlChar,
  randomNIFWith,
  randomNIEWith,
  normalize,
} from "../src/index";

describe("api", () => {
  it("should export isValid", () => {
    expect(isValid).toBeTruthy();
  });

  it("should export normalize", () => {
    expect(normalize).toBeTruthy();
  });

  it("should export isNIE", () => {
    expect(isNIE).toBeTruthy();
  });

  it("should export isNIF", () => {
    expect(isNIF).toBeTruthy();
  });

  it("should export randomNIE", () => {
    expect(randomNIE).toBeTruthy();
  });

  it("should export randomNIF", () => {
    expect(randomNIF).toBeTruthy();
  });

  it("should export ctrlChar", () => {
    expect(ctrlChar).toBeTruthy();
  });

  it("should export randomNIFWith", () => {
    expect(randomNIFWith).toBeTruthy();
  });

  it("should export randomNIEWith", () => {
    expect(randomNIEWith).toBeTruthy();
  });
});
