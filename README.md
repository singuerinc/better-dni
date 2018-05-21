[![Build Status](https://travis-ci.org/singuerinc/better-dni.svg?branch=master)](https://travis-ci.org/singuerinc/better-dni)
[![Coverage Status](https://coveralls.io/repos/github/singuerinc/better-dni/badge.svg?branch=master)](https://coveralls.io/github/singuerinc/better-dni?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/singuerinc/better-dni/badge.svg)](https://snyk.io/test/github/singuerinc/better-dni)

![logo.svg](logo.svg)

Spanish DNI (NIE / NIF) validation

## Installation

```js
// npm
npm i better-dni

// yarn
yarn add better-dni
```

## Usage

```js
import { isValid, isNIE, isNIF } from 'better-dni';

isValid('Z7662566Y'); // => true
isNIE('x0000000a'); // => true
isNIF('00000000A'); // => true

// it also handle some common user input mistakes and special cases
isValid(' Z7662566Y    '); // => true
isValid('Z7662566-Y'); // => true
```

## Benchmark

`better-dni` is doing the same job as other libraries like [dni-js](https://github.com/albertfdp/dni-js/), [dni-js-validator](https://github.com/idirouhab/dni-js-validator), and [@willowi/validate-nif](https://github.com/WillowiDev/validate-nif) but `better-dni` is built with optimization and speed in mind. Take a look at these benchmark results:

| lib                   | method      | operations/sec |
| --------------------- | ----------- | -------------- |
| better-dni            | isValid     | **68,613,690** |
| dni-js                | isValid     | 2,630,463      |
| dni-js-validator      | isValid     | 6,455,491      |
| @willowi/validate-nif | validateNif | 755,383        |

> Benchmark on a MacBook Pro (Retina, 13-inch, Early 2015) - 3,1 GHz Intel Core i7 - 16 GB 1867 MHz DDR3

## Demo

[https://blissful-kilby-263882.netlify.com/](https://blissful-kilby-263882.netlify.com/)
