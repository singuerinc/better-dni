import { isNIF } from "../src/isNIF";

describe("#isNIF", () => {
  it("should return true if is nif", () => {
    expect(isNIF("48124311P")).toBe(true);
    expect(isNIF("75967948Y")).toBe(true);
    expect(isNIF("03118880B")).toBe(true);
    expect(isNIF("68785585Z")).toBe(true);
  });

  it("should return if is not nif", () => {
    expect(isNIF("0000000AA")).toBe(false);
  });

  it("should not validate long strings that contains valid nifs", () => {
    expect(isNIF("00000000aaaaaaaaaaa")).toBe(false);
  });

  it("should handle empty strings", () => {
    expect(isNIF("")).toBe(false);
  });

  it("should handle null values", () => {
    expect(isNIF(null)).toBe(false);
  });

  it("should handle undefined values", () => {
    expect(isNIF(undefined)).toBe(false);
  });
});
