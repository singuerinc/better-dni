# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two primary audiences, weighted equally:

- **JavaScript developers evaluating a Spanish ID validator.** They are choosing between `better-dni` and alternatives (dni-js, dni-js-validator, @willowi/validate-nif) and want to see quickly that it is fast, tiny and correct, then install it.
- **Developers who need valid test data.** They need real-looking, checksum-valid NIFs/NIEs for fixtures, forms or QA, and use the live demo as a generator and a quick checker.

## Product Purpose

`better-dni` is an open-source npm library that validates Spanish DNI identifiers (NIF and NIE), computes the control letter, normalizes messy input and generates valid random IDs. The site at better-dni.singuerinc.com (this app) is its landing page and live demo: type or paste an ID and see `isValid` / `isNIE` / `isNIF` results instantly, or generate a random NIE/NIF.

Success: an evaluating developer leaves convinced and with `npm i better-dni`; a developer needing data leaves with a valid ID in hand.

## Positioning

Three claims, all backed by the library itself:

1. **Speed.** `isValid` is ~3x faster than dni-js and dni-js-validator and ~15x faster than @willowi/validate-nif (README benchmark: 10M calls, median of 3 runs, M3 Pro, Node 22).
2. **Size.** 812 bytes minified + brotli.
3. **Generators.** `randomNIF`, `randomNIE`, and seeded `randomNIFWith` / `randomNIEWith` for deterministic test data, plus `ctrlChar` and `normalize`.

## Operating Context

- Visitors arrive from npm, GitHub or search, usually mid-task while building a form or writing tests.
- The demo runs the real library in the browser (`better-dni` is a workspace dependency of this app).
- Install paths: npm, pnpm, yarn. Source and docs live in the GitHub repo and README.

## Capabilities and Constraints

- Public API: `isValid`, `isNIF`, `isNIE`, `ctrlChar`, `normalize`, `randomNIF`, `randomNIFWith`, `randomNIE`, `randomNIEWith`. The API did not change in v5.
- v5 packaging: Node 20+, ESM and CommonJS, bundled TypeScript types, root import only.
- Stack: Vite + React 19 single-page app in a pnpm/Turborepo monorepo, deployed on Vercel.
- Terminology: DNI is the umbrella term; NIF (Spanish nationals, plus the K, L and M NIFs for minors and people without a DNI or NIE) and NIE (foreigners, prefix X/Y/Z) are the two kinds; the trailing letter is the control character.
- Benchmark nuance: on `ctrlChar`, dni-js is ~1.1x faster than `better-dni`. Speed claims must be scoped to `isValid`, not stated as "faster at everything".

## Brand Commitments

- Product name: **Better DNI** (package `better-dni`).
- Creator credit: **@singuerinc**, linking to github.com/singuerinc.
- The current site's leetspeak wordmark, logo files, colors and type are not binding.

## Evidence on Hand

- Benchmark tables in the root `README.md` (isValid and ctrlChar), reproducible with `pnpm --filter better-dni benchmark`.
- Bundle size figure (812 B min + brotli) from the README.
- Badges: npm version, Codacy grade, Coveralls coverage, Snyk, bundlephobia.
- Logo: `logo.svg` / `logo.png` at the repo root (available, not required).
- Official reference for the control-letter algorithm: Spanish Ministry of the Interior page linked in the README.
- Related project: spain-phone (Spanish phone validation).
- No testimonials, user counts, download stats or company logos are on hand; do not invent them.

## Product Principles

1. **Show, don't claim.** The live demo running the real library is the strongest argument; numbers come from the reproducible benchmark.
2. **Honest numbers.** Every performance or size figure must match the README and keep its scope and conditions.
3. **Two jobs, one page.** Evaluating and grabbing test data are equal jobs; neither should be buried behind the other.
4. **Get to install fast.** The install command and the API should be reachable without hunting.

## Accessibility & Inclusion

No product-specific requirement established beyond standard WCAG AA practice.
