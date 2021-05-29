import { isValid } from "../src/isValid";

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
    it("should handle empty strings", () => {
      expect(isValid("")).toBe(false);
    });

    it("should handle null values", () => {
      expect(isValid(null)).toBe(false);
    });

    it("should handle undefined values", () => {
      expect(isValid(undefined)).toBe(false);
    });
  });
});
