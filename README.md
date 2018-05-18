# Better DNI

Validates Spanish DNI (NIE / NIF)

## Installation

```js
// npm
npm i better-dni

// yarn
yarn add better-dni
```

## Usage

```js
import { isValid } from 'better-dni';

isValid('Z7662566Y'); // => true
isNIE('x0000000a'); // => true
isNIF('00000000A'); // => true

// it also handle some common user input mistakes
isValid(' Z7662566Y    '); // => true
isValid('Z7662566-Y'); // => true
```
