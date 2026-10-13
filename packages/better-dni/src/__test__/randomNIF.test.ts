import { ctrlChar } from "../ctrlChar";
import { isNIF } from "../isNIF";
import { randomNIF } from "../randomNIF";

describe("#randomNIF", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each([0, 0.25, 0.5, 1e-7, 0.123])(
    "should return a valid NIF when Math.random() returns %s",
    (value) => {
      vi.spyOn(Math, "random").mockReturnValue(value);
      expect(isNIF(randomNIF())).toBe(true);
    },
  );

  it("should return a random nif", () => {
    const nif = randomNIF();
    expect(isNIF(nif)).toBe(true);
  });

  it("should return the ctrl char in upper case", () => {
    const nif = randomNIF();
    const char = ctrlChar(nif);
    expect(char).toBe(char.toUpperCase());
  });

  it("should create 20 valid items", () => {
    const list = Array(20).fill(0).map(randomNIF);

    expect(list.every(isNIF)).toBe(true);
  });
});
