//@ts-check
const assert = require("assert");

const PROVINCES = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "60",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "67",
  "68",
  "70",
  "71",
  "72",
  "73",
  "74",
  "75",
  "76",
  "77",
  "78",
  "79",
  "80",
  "81",
  "82",
  "83",
  "84",
  "85",
  "86",
  "87",
  "88",
  "90",
  "91",
  "92",
  "93",
  "94",
  "95",
  "96",
  "97",
  "98",
  "99",
];

const CIF_OK = "A58818501";
const CIF_KO = "158818502";

/**
 * @param {string} x
 */
const isCIF = (x) => {
  const [a, b, c, d, e, f, g, h, i] = x;
  const isLetter = (x) => /[PQRSW]/.test(x);
  const isNumber = (x) => /[ABEH]/.test(x);
  const isAny = (x) => /[CDFGJNUV]/.test(x);

  const ctrl0 = "00" === a + "" + b ? !isNaN(parseInt(i, 10)) : true;
  const ctrl1 = isNumber(a) === !isNaN(parseInt(i, 10));
  const ctrl2 = isLetter(a) === isNaN(parseInt(i, 10));
  const ctrl3 = !isLetter(a) && !isNumber(a) ? isAny(a) : true;

  const sum1 = [c, e, g].reduce((p, c) => p + parseInt(c, 10), 0);
  const sum2 = [b, d, f, h].reduce((prev, curr) => {
    const [a, b] = ("0" + parseInt(curr, 10) * 2).substr(-2);
    return prev + parseInt(a, 10) + parseInt(b, 10);
  }, 0);
  const units = ("0" + (sum1 + sum2)).substr(-1);
  const digit = 10 - parseInt(units, 10);

  const ctrl = {
    J: 0,
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
  };

  return (
    x.length === 9 &&
    /^[ABCDEFGHJNPQRSUVW]/.test(x) &&
    PROVINCES.includes(b + "" + c) &&
    ctrl0 &&
    ctrl1 &&
    ctrl2 &&
    ctrl3 &&
    ctrl[a] === digit
  );
};

describe.only("#isCIF", () => {
  it("should work", () => {
    assert.equal(isCIF(CIF_OK), true);
  });

  it("should work", () => {
    assert.equal(isCIF(CIF_KO), false);
  });

  it("should work", () => {
    assert.equal(isCIF("N1350140H"), true);
  });

  it("should work", () => {
    assert.equal(isCIF("B67657189"), true);
  });
});
