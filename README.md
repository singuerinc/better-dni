# Better DNI

Validates Spanish DNI (NIE / NIF)

## Installation

```js
// npm or yarn
npm i better-dni
```

## Usage

```js
import { valid } from 'better-dni';

valid('Z7662566Y'); // => true
isNIE('x0000000a'); // => true
isNIF('00000000A'); // => true

// it also handle some common user input mistakes
valid(' Z7662566Y    '); // => true
valid('Z7662566-Y'); // => true
```
