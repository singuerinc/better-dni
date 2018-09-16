[![Codacy Badge](https://api.codacy.com/project/badge/Grade/83d00fabfa424b0dbba64735f64ff74c)](https://app.codacy.com/app/nahuel.scotti/better-dni)
[![Build Status](https://travis-ci.org/singuerinc/better-dni.svg?branch=master)](https://travis-ci.org/singuerinc/better-dni)
[![Coverage Status](https://coveralls.io/repos/github/singuerinc/better-dni/badge.svg?branch=master)](https://coveralls.io/github/singuerinc/better-dni?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/singuerinc/better-dni/badge.svg)](https://snyk.io/test/github/singuerinc/better-dni)

![Better DNI](logo.png)

The fastest Spanish DNI (NIE / NIF) validation

## Installation

```js
// npm
npm i better-dni

// yarn
yarn add better-dni
```

## Usage

### isValid / isNIF / isNIE / ctrlChar

```js
import { isValid, isNIF, isNIE, ctrlChar } from "better-dni";

// validates any type of DNI (NIE or NIF)
isValid("Z7662566Y"); //=> true

// checks if it is a valid NIF
isNIF("06672804K"); //=> true

// checks if it is a valid NIE
isNIE("X1302311M"); //=> true

// returns the control letter in upper case
ctrlChar("X1302311M"); //=> 'M'
ctrlChar("X1302311"); //=> 'M'
```

### Generators

#### NIF

```js
import { randomNIF, randomNIFWith } from "better-dni";

randomNIF(); //=> '31719111H'

// returns a valid random NIF given the control letter
randomNIFWith("C"); // => '95652190C'

// a seed (Number) can be provided and it will always return the same result
randomNIFWith("G", 1); //=> '95652174G'
randomNIFWith("G", 1); //=> '95652174G'
```

#### NIE

```js
import { randomNIE, randomNIEWith } from "better-dni";

randomNIE(); //=> 'X1120409X'

// returns a valid random NIE given the first and control letter
randomNIEWith("Y", "C"); //=> 'Y2098020C'
randomNIEWith("Z", "G"); //=> 'Z5670557G'

// a seed (Number) can be provided and it will always return the same result
randomNIEWith("X", "E", 1); //=> 'X2080280E'
randomNIEWith("X", "E", 1); //=> 'X2080280E'
```

#### Normalize

```js
// Returns a "clean" dni string removing spaces, dashes, etc.
normalize(" x-9464186_p   "); // => "X9464186P"
```

## Benchmark

`better-dni` does a similar job as other libraries like [dni-js](https://github.com/albertfdp/dni-js/), [dni-js-validator](https://github.com/idirouhab/dni-js-validator), and [@willowi/validate-nif](https://github.com/WillowiDev/validate-nif) but `better-dni` is built with optimization and speed in mind. Take a look at these benchmark results:

```js
yarn build && yarn benchmark
```

### isValid

| lib                   | method       | operations/sec |             |
| --------------------- | ------------ | -------------- | ----------- |
| better-dni            | #isValid     | **10,128,148** | 3.5x faster |
| dni-js-validator      | #isValid     | 2,870,822      |             |
| dni-js                | #isValid     | 2,448,090      |             |
| @willowi/validate-nif | #validateNif | 683,573        |             |

### ctrlChar / getLetter

| lib                   | method     | operations/sec |             |
| --------------------- | ---------- | -------------- | ----------- |
| better-dni            | #ctrlChar  | **10,874,568** | 5.3x faster |
| dni-js                | #getLetter | 2,032,845      |             |
| dni-js-validator      | no method  | -              |             |
| @willowi/validate-nif | no method  | -              |             |

> Benchmark on a MacBook Pro (Retina, 13-inch, Early 2015) - 3,1 GHz Intel Core i7 - 16 GB 1867 MHz DDR3 / Node v10.2.1

## Demo

[https://better-dni.netlify.com/](https://better-dni.netlify.com/)

## Related

- [spain-phone](https://github.com/singuerinc/spain-phone) - Spanish phone number validation

## Reference

[http://www.interior.gob.es/web/servicios-al-ciudadano/dni/calculo-del-digito-de-control-del-nif-nie](http://www.interior.gob.es/web/servicios-al-ciudadano/dni/calculo-del-digito-de-control-del-nif-nie)
