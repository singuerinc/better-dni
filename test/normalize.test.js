const assert = require("assert");
const { normalize } = require("../dist/index");

describe("normalize", () => {
  describe("clean", () => {
    it("should remove spaces", () => {
      assert.equal(normalize("X 9464186 P"), "X9464186P");
    });

    it("should remove dashes", () => {
      assert.equal(normalize("X-9464186-P"), "X9464186P");
    });

    it("should remove underscores", () => {
      assert.equal(normalize("X_9464186_P"), "X9464186P");
    });

    it("should trim", () => {
      assert.equal(normalize("   X9464186P   "), "X9464186P");
    });

    it("should uppercase", () => {
      assert.equal(normalize("x9464186p"), "X9464186P");
    });

    it("should normalize everything", () => {
      assert.equal(normalize(" x-9464186_p   "), "X9464186P");
    });

    it("should normalize a nif", () => {
      assert.equal(normalize("---1196 4487 W   "), "11964487W");
    });
  });
});
