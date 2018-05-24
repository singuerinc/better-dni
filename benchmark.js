const Benchmark = require('benchmark');
const { isValid: better_dni_isValid } = require('./dist/index');
const { isValid: dni_js_isValid } = require('dni-js');
const { isValid: dni_js_validator_isValid } = require('dni-js-validator');
const { validateNif } = require('@willowi/validate-nif');

const suite1 = new Benchmark.Suite();

suite1
  .add('better-dni#isValid', function() {
    better_dni_isValid('12345678Z');
  })
  .add('dni-js-validator#isValid', function() {
    dni_js_validator_isValid('12345678Z');
  })
  .add('dni-js#isValid', function() {
    dni_js_isValid('12345678Z');
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
