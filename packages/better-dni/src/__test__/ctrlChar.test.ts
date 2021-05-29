import { ctrlChar } from "../ctrlChar";

describe("#ctrlChar", () => {
  it("should return the letter for a NIE in upper case with control letter", () => {
    expect(ctrlChar("x9464186p")).toBe("P");
  });

  it("should return the letter for a NIE in upper case with control letter", () => {
    expect(ctrlChar("X9464186P")).toBe("P");
  });

  it("should return the letter for a NIE in upper case without control letter", () => {
    expect(ctrlChar("x9464186")).toBe("P");
  });

  it("should return the letter for a NIF in upper case without control letter", () => {
    expect(ctrlChar("X9464186")).toBe("P");
  });

  it("should return the letter for a NIF in upper case with control letter", () => {
    expect(ctrlChar("03118880b")).toBe("B");
  });

  it("should return the letter for a NIF without control letter", () => {
    expect(ctrlChar("03118880")).toBe("B");
  });
});
