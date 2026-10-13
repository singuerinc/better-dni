import { isValid } from "../isValid";

describe("#isValid", () => {
  describe("nif", () => {
    it("should not validate more than max chars", () => {
      expect(isValid("x9464186p123456")).toBe(false);
    });

    it("should validate 55799910R", () => {
      expect(isValid("55799910R")).toBe(true);
    });

    it("should validate 50172129K", () => {
      expect(isValid("50172129K")).toBe(true);
    });

    it("should validate 11964487W", () => {
      expect(isValid("11964487W")).toBe(true);
    });
  });

  describe("nif with k", () => {
    it("should validate K1111111G", () => {
      expect(isValid("K1111111G")).toBe(true);
    });

    it("should validate k0867756n", () => {
      expect(isValid("k0867756n")).toBe(true);
    });

    it("should not validate K1111111C", () => {
      expect(isValid("K1111111C")).toBe(false);
    });
  });

  describe("nif with l or m", () => {
    it("should validate L1111111G", () => {
      expect(isValid("L1111111G")).toBe(true);
    });

    it("should validate m1234567l", () => {
      expect(isValid("m1234567l")).toBe(true);
    });

    it("should not validate L1111111C", () => {
      expect(isValid("L1111111C")).toBe(false);
    });
  });

  describe("nie", () => {
    it("should validate x9464186p", () => {
      expect(isValid("x9464186p")).toBe(true);
    });

    it("should validate Z0697009E", () => {
      expect(isValid("z0697009e")).toBe(true);
    });

    it("should validate Y2843665M", () => {
      expect(isValid("y2843665m")).toBe(true);
    });

    it("should validate Z7662566Y", () => {
      expect(isValid("z7662566y")).toBe(true);
    });

    it.skip("should validate  Z7662566-Y", () => {
      expect(isValid(" z7662566-y")).toBe(true);
    });

    it.skip("should validate  Z7662566-Y   ", () => {
      expect(isValid(" z7662566-y   ")).toBe(true);
    });

    it("should validate 00631803Q", () => {
      expect(isValid("00631803q")).toBe(true);
    });

    it("should not validate X9464186X", () => {
      expect(isValid("X9464186X")).toBe(false);
    });

    it("should not validate Z1464186P", () => {
      expect(isValid("Z1464186P")).toBe(false);
    });
  });

  describe("errors", () => {
    it("should not validate 9 chars strings with an invalid format", () => {
      expect(isValid("+3118880B")).toBe(false);
      expect(isValid(" 3118880B")).toBe(false);
      expect(isValid("A3118880B")).toBe(false);
    });

    it("should handle empty strings", () => {
      expect(isValid("")).toBe(false);
    });

    it("should handle null values", () => {
      //@ts-expect-error possible but not allowed by ts
      expect(isValid(null)).toBe(false);
    });

    it("should handle undefined values", () => {
      //@ts-expect-error possible but not allowed by ts
      expect(isValid(undefined)).toBe(false);
    });
  });
});
