const assert = require("assert");
const { isValid } = require("../dist/index");

describe("#isValid", () => {
  describe("nif", () => {
    it("should not validate more than max chars", () => {
      assert.equal(isValid("x9464186p123456"), false);
    });

    it("should validate 55799910R", () => {
      assert.equal(isValid("55799910R"), true);
    });

    it("should validate 50172129K", () => {
      assert.equal(isValid("50172129K"), true);
    });

    it("should validate 11964487W", () => {
      assert.equal(isValid("11964487W"), true);
    });
  });

  describe("nie", () => {
    it("should validate x9464186p", () => {
      assert.equal(isValid("x9464186p"), true);
    });

    it("should validate Z0697009E", () => {
      assert.equal(isValid("z0697009e"), true);
    });

    it("should validate Y2843665M", () => {
      assert.equal(isValid("y2843665m"), true);
    });

    it("should validate Z7662566Y", () => {
      assert.equal(isValid("z7662566y"), true);
    });

    it.skip("should validate  Z7662566-Y", () => {
      assert.equal(isValid(" z7662566-y"), true);
    });

    it.skip("should validate  Z7662566-Y   ", () => {
      assert.equal(isValid(" z7662566-y   "), true);
    });

    it("should validate 00631803Q", () => {
      assert.equal(isValid("00631803q"), true);
    });

    it("should not validate X9464186X", () => {
      assert.equal(isValid("X9464186X"), false);
    });

    it("should not validate Z1464186P", () => {
      assert.equal(isValid("Z1464186P"), false);
    });
  });

  describe("errors", () => {
    it("should handle empty strings", () => {
      assert.equal(isValid(""), false);
    });

    it("should handle null values", () => {
      assert.equal(isValid(null), false);
    });

    it("should handle undefined values", () => {
      assert.equal(isValid(undefined), false);
    });
  });
});
