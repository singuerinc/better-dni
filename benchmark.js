const Benchmark = require("benchmark");
const {
  isValid: better_dni_isValid,
  ctrlChar: better_dni_isValid_ctrlChar,
  randomNIE,
  randomNIEWith,
  randomNIF,
  randomNIFWith,
  isNIE,
  isNIF
} = require("./dist/index");
const { isValid: dni_js_isValid, getControlDigit: dni_js_getControlDigit } = require("dni-js");
const { isValid: dni_js_validator_isValid } = require("dni-js-validator");
const { validateNif } = require("@willowi/validate-nif");

const benches = [];

benches.push(
  new Benchmark.Suite("isValid")
    .add("better-dni#isValid", () => {
      better_dni_isValid("12345678Z");
    })
    .add("dni-js-validator#isValid", () => {
      dni_js_validator_isValid("12345678Z");
    })
    .add("dni-js#isValid", () => {
      dni_js_isValid("12345678Z");
    })
    .add("@willowi/validate-nif#validateNif", () => {
      validateNif("12345678Z");
    })
    .on("cycle", function(event) {
      console.log(String(event.target));
    })
    .on("complete", function() {
      console.log("Fastest is " + this.filter("fastest").map("name"));
    }),
  new Benchmark.Suite("ctrl char")
    .add("better-dni#ctrlChar", () => {
      better_dni_isValid_ctrlChar("X0729124R");
    })
    .add("dni-js-validator#getControlDigit", () => {
      dni_js_getControlDigit("X0729124R");
    })
    .on("cycle", function(event) {
      console.log(String(event.target));
    })
    .on("complete", function() {
      console.log("Fastest is " + this.filter("fastest").map("name"));
    }),
  new Benchmark.Suite("random")
    .add("better-dni#randomNIE", () => {
      randomNIE();
    })
    .add("better-dni#randomNIF", () => {
      randomNIF();
    })
    .on("cycle", function(event) {
      console.log(String(event.target));
    })
    .on("complete", function() {
      console.log("Fastest is " + this.filter("fastest").map("name"));
    }),
  new Benchmark.Suite("is")
    .add("better-dni#isNIE", () => {
      isNIE("Z9407822E");
    })
    .add("better-dni#isNIF", () => {
      isNIF("42406984K");
    })
    .on("cycle", function(event) {
      console.log(String(event.target));
    })
    .on("complete", function() {
      console.log("Fastest is " + this.filter("fastest").map("name"));
    }),
  new Benchmark.Suite("randomNIEWith")
    .add("better-dni#randomNIEWith", () => {
      randomNIEWith("Z", "E");
    })
    .on("cycle", function(event) {
      console.log(String(event.target));
    })
    .on("complete", function() {
      console.log("Fastest is " + this.filter("fastest").map("name"));
    }),
  new Benchmark.Suite("randomNIFWith")
    .add("better-dni#randomNIFWith", () => {
      randomNIFWith("E");
    })
    .on("cycle", function(event) {
      console.log(String(event.target));
    })
    .on("complete", function() {
      console.log("Fastest is " + this.filter("fastest").map("name"));
    })
);

Benchmark.invoke([benches[0]], {
  name: "run",
  args: true,
  queued: true
});
