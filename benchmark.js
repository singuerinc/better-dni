const Benchmark = require('benchmark');
const { isValid: better_dni_isValid } = require('./index');
const { isValid: dni_js_isValid } = require('dni-js');
const { isValid: dni_js_validator_isValid } = require('dni-js-validator');
const { validateNif } = require('@willowi/validate-nif');

// console.log(better_dni_isValid('12345678Z'));

// console.log('better_dni_isValid', better_dni_isValid('12345678Z'));
// console.log('dni_js_isValid', dni_js_isValid('12345678Z'));
// console.log('dni_js_validator_isValid', dni_js_validator_isValid('12345678Z'));
// console.log('validateNif', validateNif('12345678Z'));

const suite1 = new Benchmark.Suite();

suite1
  .add('better-dni#isValid', function() {
    better_dni_isValid('12345678Z');
  })
  .add('dni-js#isValid', function() {
    dni_js_isValid('12345678Z');
  })
  .add('dni-js-validator#isValid', function() {
    dni_js_validator_isValid('12345678Z');
  })
  .add('@willowi/validate-nif#validateNif', function() {
    validateNif('12345678Z');
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });

// const suite2 = new Benchmark.Suite();
// let i = 0;
// const count = i => i % 4;
// const randomNIF = () => {
//   i++;
//   return ['12345678Z', 'X9464187D', 'X9464186P', '03118880B'][count(i)];
// };

// suite2
//   .add('better-dni#isValid with variable nif', function() {
//     better_dni_isValid(randomNIF());
//   })
//   .add('dni-js#isValid with variable nif', function() {
//     dni_js_isValid(randomNIF());
//   })
//   .add('dni-js-validator#isValid with variable nif', function() {
//     dni_js_validator_isValid(randomNIF());
//   })
//   .add('@willowi/validate-nif#validateNif with variable nif', function() {
//     validateNif(randomNIF());
//   })
//   .on('cycle', function(event) {
//     console.log(String(event.target));
//   })
//   .on('complete', function() {
//     console.log('Fastest is ' + this.filter('fastest').map('name'));
//   })
//   .run({ async: true });
