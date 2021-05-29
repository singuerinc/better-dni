import { normalize } from "../src/normalize";

describe("normalize", () => {
  describe("clean", () => {
    it("should remove spaces", () => {
      expect(normalize("X 9464186 P")).toBe("X9464186P");
    });

    it("should remove dashes", () => {
      expect(normalize("X-9464186-P")).toBe("X9464186P");
    });

    it("should remove underscores", () => {
      expect(normalize("X_9464186_P")).toBe("X9464186P");
    });

    it("should trim", () => {
      expect(normalize("   X9464186P   ")).toBe("X9464186P");
    });

    it("should uppercase", () => {
      expect(normalize("x9464186p")).toBe("X9464186P");
    });

    it("should normalize everything", () => {
      expect(normalize(" x-9464186_p   ")).toBe("X9464186P");
    });

    it("should normalize a nif", () => {
      expect(normalize("---1196 4487 W   ")).toBe("11964487W");
    });
  });
});
