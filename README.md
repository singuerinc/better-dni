[![Build Status](https://travis-ci.org/singuerinc/better-dni.svg?branch=master)](https://travis-ci.org/singuerinc/better-dni)
[![Coverage Status](https://coveralls.io/repos/github/singuerinc/better-dni/badge.svg?branch=master)](https://coveralls.io/github/singuerinc/better-dni?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/singuerinc/better-dni/badge.svg)](https://snyk.io/test/github/singuerinc/better-dni)

![Better DNI](logo.png)

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
import { isValid, isNIF, isNIE, randomNIF, ctrlChar } from 'better-dni';

// validates any type of DNI (NIE or NIF)
isValid('Z7662566Y'); //=> true

// checks if it is a valid NIF
isNIF('06672804K'); //=> true

// checks if it is a valid NIE
isNIE('X1302311M'); //=> true

// returns the control letter in lower case
ctrlChar('X1302311M'); //=> 'm'
ctrlChar('X1302311'); //=> 'm'

// random generators, useful for testing
randomNIF(); //=> String
randomNIE(); //=> String
```

## Benchmark

`better-dni` does a similar job as other libraries like [dni-js](https://github.com/albertfdp/dni-js/), [dni-js-validator](https://github.com/idirouhab/dni-js-validator), and [@willowi/validate-nif](https://github.com/WillowiDev/validate-nif) but `better-dni` is built with optimization and speed in mind. Take a look at these benchmark results:

### isValid

| lib                   | method       | operations/sec |             |
| --------------------- | ------------ | -------------- | ----------- |
| better-dni            | #isValid     | **7,557,496**  | 260% faster |
| dni-js-validator      | #isValid     | 2,900,386      |             |
| dni-js                | #isValid     | 2,474,098      |             |
| @willowi/validate-nif | #validateNif | 681,591        |             |

### ctrlChar / getLetter

| lib                   | method     | operations/sec |             |
| --------------------- | ---------- | -------------- | ----------- |
| better-dni            | #ctrlChar  | **9,328,614**  | 236% faster |
| dni-js                | #getLetter | 3,947,197      |             |
| dni-js-validator      | no method  | -              |             |
| @willowi/validate-nif | no method  | -              |             |

> Benchmark on a MacBook Pro (Retina, 13-inch, Early 2015) - 3,1 GHz Intel Core i7 - 16 GB 1867 MHz DDR3 / Node v10.2.1

## Demo

[https://better-dni.netlify.com/](https://better-dni.netlify.com/)

## Related

* [spain-phone](https://github.com/singuerinc/spain-phone) - Spanish phone number validation

## Reference

[http://www.interior.gob.es/web/servicios-al-ciudadano/dni/calculo-del-digito-de-control-del-nif-nie](http://www.interior.gob.es/web/servicios-al-ciudadano/dni/calculo-del-digito-de-control-del-nif-nie)
