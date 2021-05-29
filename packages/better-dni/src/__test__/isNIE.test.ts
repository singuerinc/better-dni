import { isNIE } from "../isNIE";

describe("#isNIE", () => {
  it("should return if is nie with X", () => {
    expect(isNIE("x9464186p")).toBe(true);
    expect(isNIE("X9464186P")).toBe(true);
  });

  it("should return if is nie with Y", () => {
    expect(isNIE("y1715871q")).toBe(true);
    expect(isNIE("Y1715871Q")).toBe(true);
  });

  it("should return if is nie with Z", () => {
    expect(isNIE("z0078471t")).toBe(true);
    expect(isNIE("Z0078471T")).toBe(true);
  });

  it("should return false if is nie with 0", () => {
    expect(isNIE("09464186P")).toBe(false);
  });

  it("should return false if is nie with 1", () => {
    expect(isNIE("11715871Q")).toBe(false);
  });

  it("should return false if is nie with 2", () => {
    expect(isNIE("20078471T")).toBe(false);
  });

  it("should return if is not nie", () => {
    expect(isNIE("Z00A000AA")).toBe(false);
  });

  it("should handle empty strings", () => {
    expect(isNIE("")).toBe(false);
  });

  it("should not validate long strings that contain valid nies", () => {
    expect(isNIE("x9464186paaaaaaaaaaaaaaa")).toBe(false);
  });

  it("should handle null values", () => {
    //@ts-expect-error possible but not allowed by ts
    expect(isNIE(null)).toBe(false);
  });

  it("should handle undefined values", () => {
    //@ts-expect-error possible but not allowed by ts
    expect(isNIE(undefined)).toBe(false);
  });
});
