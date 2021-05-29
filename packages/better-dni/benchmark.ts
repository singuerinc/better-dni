import { validateNif } from "@willowi/validate-nif";
import { getControlDigit, isValid as dniJsIsValid } from "dni-js";
import { isValid as dniJsValidatorIsValid } from "dni-js-validator";
import * as nanobench from "nanobench";
import { ctrlChar } from "./src/ctrlChar";
import { isNIE } from "./src/isNIE";
import { isNIF } from "./src/isNIF";
import { isValid } from "./src/isValid";
import { randomNIE } from "./src/randomNIE";
import { randomNIEWith } from "./src/randomNIEWith";
import { randomNIF } from "./src/randomNIF";
import { randomNIFWith } from "./src/randomNIFWith";

nanobench("isValid 10.000.000 times", function (b: any) {
  b.start();

  for (let i = 0; i < 10_000_000; i++) {
    isValid("12345678Z");
  }

  b.end();
});

nanobench("dni-js-validator isValid 10.000.000 times", function (b: any) {
  b.start();

  for (let i = 0; i < 10_000_000; i++) {
    dniJsValidatorIsValid("12345678Z");
  }

  b.end();
});

nanobench("dni-js-validator isValid 10.000.000 times", function (b: any) {
  b.start();

  for (let i = 0; i < 10_000_000; i++) {
    dniJsIsValid("12345678Z");
  }

  b.end();
});

nanobench(
  "@willowi/validate-nif validateNif 10.000.000 times",
  function (b: any) {
    b.start();

    for (let i = 0; i < 10_000_000; i++) {
      validateNif("12345678Z");
    }

    b.end();
  }
);

nanobench("ctrlChar 10.000.000 times", function (b: any) {
  b.start();

  for (let i = 0; i < 10_000_000; i++) {
    ctrlChar("X0729124R");
  }

  b.end();
});

nanobench("getControlDigit 10.000.000 times", function (b: any) {
  b.start();

  for (let i = 0; i < 10_000_000; i++) {
    getControlDigit("X0729124R");
  }

  b.end();
});

nanobench.skip("randomNIE 10.000.000 times", function (b: any) {
  b.start();

  for (let i = 0; i < 10_000_000; i++) {
    randomNIE();
  }

  b.end();
});

nanobench.skip("randomNIF 10.000.000 times", function (b: any) {
  b.start();

  for (let i = 0; i < 10_000_000; i++) {
    randomNIF();
  }

  b.end();
});

nanobench("isNIE 10.000.000 times", function (b: any) {
  b.start();

  for (let i = 0; i < 10_000_000; i++) {
    isNIE("Z9407822E");
  }

  b.end();
});

nanobench("isNIF 10.000.000 times", function (b: any) {
  b.start();

  for (let i = 0; i < 10_000_000; i++) {
    isNIF("42406984K");
  }

  b.end();
});

nanobench("randomNIEWith 10.000.000 times", function (b: any) {
  b.start();

  for (let i = 0; i < 10_000_000; i++) {
    randomNIEWith("Z", "E");
  }

  b.end();
});

nanobench("randomNIFWith 10.000.000 times", function (b: any) {
  b.start();

  for (let i = 0; i < 10_000_000; i++) {
    randomNIFWith("E");
  }

  b.end();
});
