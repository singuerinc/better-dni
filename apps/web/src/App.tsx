import { randomNIE, randomNIF } from "better-dni";
import { useEffect, useId, useState, type ChangeEvent } from "react";
import { CopyButton } from "./CopyButton";
import { Figure } from "./Figure";
import { formatNumber, t } from "./i18n";
import { LETTERS, isNIEPrefix, read, verdict, type Reading } from "./parse";
import { Stamp } from "./Stamp";

const EXAMPLE = "X1302311M";
const INSTALL = "npm i better-dni";

const BENCHMARK = [
  { lib: "better-dni", method: "isValid", ms: 84, factor: null },
  { lib: "dni-js", method: "isValid", ms: 859, factor: 10.23 },
  { lib: "dni-js-validator", method: "isValid", ms: 980, factor: 11.67 },
  {
    lib: "@willowi/validate-nif",
    method: "validateNif",
    ms: 4240,
    factor: 50.48,
  },
];
const SLOWEST = Math.max(...BENCHMARK.map((row) => row.ms));

const SECTIONS = ["fig-1", "fig-2", "fig-3", "claims"];

function useCurrentSection() {
  const [current, setCurrent] = useState(SECTIONS[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setCurrent(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return current;
}

function SectionHead({
  id,
  fig,
  title,
}: {
  id: string;
  fig?: string;
  title: string;
}) {
  return (
    <div className="section-head">
      <h2 id={id} className="section-heading">
        {fig && <span className="fig-title">{fig}</span>}
        <span className="section-title">{title}</span>
      </h2>
      <div className="crosshair-rule" aria-hidden="true" />
    </div>
  );
}

function Bool({ value }: { value: boolean }) {
  return (
    <span className={value ? "bool is-true" : "bool"}>{String(value)}</span>
  );
}

function ReferenceTable({
  reading,
  example,
}: {
  reading: Reading;
  example: boolean;
}) {
  const dash = <span className="muted">—</span>;
  const letterFlag = Boolean(
    reading.letter && reading.expected && reading.letter !== reading.expected,
  );
  return (
    <table className={example ? "reference is-example" : "reference"}>
      <caption className={example ? "reference-note" : "sr-only"}>
        {example
          ? t.numerals.exampleCaption(reading.normalized)
          : t.numerals.caption}
      </caption>
      <thead>
        <tr>
          <th scope="col">{t.numerals.no}</th>
          <th scope="col">{t.numerals.part}</th>
          <th scope="col">{t.numerals.reading}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>10</td>
          <th scope="row">{t.numerals.prefix}</th>
          <td>
            {!reading.shaped
              ? dash
              : !reading.prefix
                ? t.numerals.noPrefix
                : isNIEPrefix(reading.prefix)
                  ? `${reading.prefix} → ${reading.digits[0]} · NIE`
                  : `${reading.prefix} → ${t.numerals.dropped} · NIF`}
          </td>
        </tr>
        <tr>
          <td>12</td>
          <th scope="row">{t.numerals.body}</th>
          <td>{reading.body || dash}</td>
        </tr>
        <tr className={letterFlag ? "is-flagged" : undefined}>
          <td>14</td>
          <th scope="row">ctrlChar()</th>
          <td>{reading.expected ?? dash}</td>
        </tr>
        <tr>
          <td>16</td>
          <th scope="row">normalize()</th>
          <td>{`"${reading.normalized}"`}</td>
        </tr>
        <tr>
          <td>18</td>
          <th scope="row">isValid()</th>
          <td>
            <Bool value={reading.isValid} />
          </td>
        </tr>
        <tr>
          <td>20</td>
          <th scope="row">isNIE()</th>
          <td>
            <Bool value={reading.isNIE} />
          </td>
        </tr>
        <tr>
          <td>22</td>
          <th scope="row">isNIF()</th>
          <td>
            <Bool value={reading.isNIF} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function ControlTable({
  reading,
  example,
}: {
  reading: Reading;
  example: Reading;
}) {
  const shown = reading.complete ? reading : example;
  const isExample = !reading.complete;
  return (
    <section className="sheet-section" id="fig-2" aria-labelledby="fig-2-title">
      <SectionHead id="fig-2-title" fig="Fig. 2" title={t.fig2.title} />
      <p className="section-lede">{t.fig2.lede}</p>
      <ol className="letters" aria-label={t.fig2.tableLabel}>
        {LETTERS.split("").map((letter, i) => (
          <li
            key={letter}
            className={shown.remainder === i ? "is-on" : undefined}
          >
            <span className="letters-index">{i}</span>
            <span className="letters-letter">{letter}</span>
          </li>
        ))}
      </ol>
      <p className="worked">
        {isExample && <span className="worked-tag">{t.fig2.example}</span>}
        <span className="mono">
          {shown.digits} mod 23 = {shown.remainder} →{" "}
          <span className="carmine">{shown.expected}</span>
        </span>
      </p>
    </section>
  );
}

function Benchmark() {
  return (
    <section className="sheet-section" id="fig-3" aria-labelledby="fig-3-title">
      <SectionHead id="fig-3-title" fig="Fig. 3" title={t.fig3.title} />
      <p className="section-lede">{t.fig3.lede}</p>
      <table className="bench">
        <caption className="sr-only">{t.fig3.caption}</caption>
        <thead>
          <tr>
            <th scope="col">{t.fig3.library}</th>
            <th scope="col">{t.fig3.method}</th>
            <th scope="col" className="bench-bar-col">
              {t.fig3.time}
            </th>
            <th scope="col">{t.fig3.against}</th>
          </tr>
        </thead>
        <tbody>
          {BENCHMARK.map((row) => (
            <tr
              key={row.lib}
              className={row.lib === "better-dni" ? "is-subject" : undefined}
            >
              <th scope="row">{row.lib}</th>
              <td className="mono">#{row.method}</td>
              <td className="bench-bar-col">
                <span className="bench-cell">
                  <span
                    className="bench-bar"
                    style={{ width: `${(row.ms / SLOWEST) * 100}%` }}
                  />
                  <span className="bench-time">
                    {row.ms < 1000
                      ? `${row.ms} ms`
                      : `${formatNumber(row.ms / 1000)} s`}
                  </span>
                </span>
              </td>
              <td>
                {row.factor ? t.fig3.slower(formatNumber(row.factor)) : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="footnote">{t.fig3.footnote}</p>
    </section>
  );
}

const CLAIMS = [
  {
    fn: "isValid(value)",
    claim: t.claims.isValid,
    example: 'isValid("Z7662566Y"); //=> true\nisValid("K1111111G"); //=> true',
  },
  {
    fn: "isNIF(value) / isNIE(value)",
    claim: t.claims.isNIF,
    example: 'isNIF("06672804K"); //=> true\nisNIE("X1302311M"); //=> true',
  },
  {
    fn: "ctrlChar(value)",
    claim: t.claims.ctrlChar,
    example: 'ctrlChar("X1302311"); //=> "M"',
  },
  {
    fn: "normalize(value)",
    claim: t.claims.normalize,
    example: 'normalize(" x-9464186_p "); //=> "X9464186P"',
  },
  {
    fn: "randomNIF() / randomNIFWith(letter, seed?)",
    claim: t.claims.randomNIF,
    example: 'randomNIFWith("G", 1); //=> "95652174G"',
  },
  {
    fn: "randomNIE() / randomNIEWith(first, letter, seed?)",
    claim: t.claims.randomNIE,
    example: 'randomNIEWith("X", "E", 1); //=> "X2080280E"',
  },
];

function Claims() {
  return (
    <section
      className="sheet-section"
      id="claims"
      aria-labelledby="claims-title"
    >
      <SectionHead id="claims-title" title={t.claims.title} />
      <div className="claims-grid">
        <ol className="claims">
          {CLAIMS.map((c) => (
            <li key={c.fn}>
              <p>
                <code className="claim-fn">{c.fn}</code> {c.claim}
              </p>
              <pre>
                <code>{c.example}</code>
              </pre>
            </li>
          ))}
        </ol>
        <aside className="install-block" aria-labelledby="install-title">
          <h3 id="install-title" className="label">
            {t.claims.installation}
          </h3>
          {[
            "npm i better-dni",
            "pnpm add better-dni",
            "yarn add better-dni",
          ].map((cmd) => (
            <div className="install-row" key={cmd}>
              <code>{cmd}</code>
              <CopyButton
                text={cmd}
                className="control control-small"
                label={t.copyLabel(cmd)}
              >
                {t.copy}
              </CopyButton>
            </div>
          ))}
          <h3 className="label">{t.claims.version}</h3>
          <ul className="v5">
            {t.claims.v5.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

export function App() {
  const [value, setValue] = useState("");
  const inputId = useId();
  const verdictId = useId();
  const empty = value.trim() === "";
  const reading = read(empty ? EXAMPLE : value);
  const example = read(EXAMPLE);
  const live = read(value);
  const current = useCurrentSection();
  const navLink = (id: string, label: string) => (
    <a href={`#${id}`} aria-current={current === id ? "location" : undefined}>
      {label}
    </a>
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  return (
    <div className="sheet">
      <span className="reg reg-tl" aria-hidden="true" />
      <span className="reg reg-tr" aria-hidden="true" />
      <span className="reg reg-bl" aria-hidden="true" />
      <span className="reg reg-br" aria-hidden="true" />

      <header className="title-block">
        <a className="monogram" href="#top" aria-label={t.header.backToTop}>
          <span>B</span>
          <span>D</span>
        </a>
        <div className="title-name">
          <span className="title-main">Better DNI</span>
          <span className="label">{t.header.tagline}</span>
        </div>
        <nav className="title-nav" aria-label={t.header.nav}>
          {navLink("fig-1", "Fig. 1")}
          {navLink("fig-2", "Fig. 2")}
          {navLink("fig-3", "Fig. 3")}
          {navLink("claims", t.header.claims)}
          <a
            href="https://github.com/singuerinc/better-dni"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href={t.other.href} hrefLang={t.other.lang} lang={t.other.lang}>
            {t.other.label}
          </a>
        </nav>
        <dl className="title-meta">
          <div>
            <dt>{t.header.sheet}</dt>
            <dd>{t.header.sheetValue}</dd>
          </div>
          <div>
            <dt>{t.header.package}</dt>
            <dd>better-dni 5.0.0</dd>
          </div>
          <div>
            <dt>{t.header.license}</dt>
            <dd>MIT</dd>
          </div>
        </dl>
      </header>

      <main id="top">
        <div className="first">
          <aside className="margin" aria-label={t.margin.label}>
            <dl>
              <div>
                <dt>{t.margin.inventor}</dt>
                <dd>
                  <a
                    href="https://github.com/singuerinc"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @singuerinc
                  </a>
                </dd>
              </div>
              <div>
                <dt>{t.margin.size}</dt>
                <dd>897 B min + brotli</dd>
              </div>
              <div>
                <dt>{t.margin.runtime}</dt>
                <dd>{t.margin.runtimeValue}</dd>
              </div>
              <div>
                <dt>{t.margin.formats}</dt>
                <dd>ESM · CJS · TS types</dd>
              </div>
            </dl>
            <Stamp
              key={live.isValid ? live.normalized : "pending"}
              className="stamp-margin"
              valid={live.isValid}
              kind={live.isNIE ? "NIE" : live.isNIF ? "NIF" : null}
            />
          </aside>

          <section className="claim" aria-labelledby="claim-title">
            <h1 id="claim-title" className="display">
              {t.display}
            </h1>
            <div className="crosshair-rule" aria-hidden="true" />
            <p className="lede">{t.lede}</p>
            <div className="actions">
              <CopyButton
                text={INSTALL}
                className="control control-primary"
                label={t.copyLabel(INSTALL)}
              >
                <span className="mono">{INSTALL}</span>
                <span className="control-hint">{t.copy}</span>
              </CopyButton>
              <a className="control" href="#claims">
                {t.readClaims}
              </a>
            </div>
          </section>

          <section className="fig-1" id="fig-1" aria-labelledby="fig-1-title">
            <div className="fig-head">
              <h2 id="fig-1-title" className="fig-title">
                Fig. 1
              </h2>
              <span className="label">
                {empty ? t.fig1.explodedExample : t.fig1.exploded}
              </span>
            </div>
            <label className="label field-label" htmlFor={inputId}>
              {t.fig1.fieldLabel}
            </label>
            <input
              id={inputId}
              className="field"
              type="text"
              value={value}
              onChange={handleChange}
              placeholder={EXAMPLE}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              aria-describedby={verdictId}
            />
            <Figure reading={reading} example={empty} />
            <div className="verdict-row">
              <p
                id={verdictId}
                className={`verdict${live.isValid ? " is-valid" : ""}`}
                role="status"
              >
                {empty ? t.fig1.exampleVerdict(EXAMPLE) : verdict(live)}
              </p>
              <Stamp
                key={live.isValid ? live.normalized : "pending"}
                className="stamp-fig"
                valid={live.isValid}
                kind={live.isNIE ? "NIE" : live.isNIF ? "NIF" : null}
              />
            </div>
          </section>

          <aside className="numerals" aria-labelledby="numerals-title">
            <h2 id="numerals-title" className="label">
              {t.numerals.title}
            </h2>
            <ReferenceTable reading={empty ? example : live} example={empty} />
            <div className="generators">
              <span className="label">{t.numerals.generate}</span>
              <button
                type="button"
                className="control"
                onClick={() => setValue(randomNIF())}
              >
                <span className="mono">randomNIF()</span>
              </button>
              <button
                type="button"
                className="control"
                onClick={() => setValue(randomNIE())}
              >
                <span className="mono">randomNIE()</span>
              </button>
            </div>
          </aside>
        </div>

        <ControlTable reading={live} example={example} />
        <Benchmark />
        <Claims />
      </main>

      <footer className="title-block title-block-foot">
        <p>
          {t.footer.drawnBy}{" "}
          <a
            href="https://github.com/singuerinc"
            target="_blank"
            rel="noopener noreferrer"
          >
            @singuerinc
          </a>{" "}
          · {t.footer.license}
        </p>
        <p>
          {t.footer.algorithm}{" "}
          <a
            href="https://www.interior.gob.es/opencms/ca/servicios-al-ciudadano/tramites-y-gestiones/dni/calculo-del-digito-de-control-del-nif-nie/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ministerio del Interior
          </a>
        </p>
        <p>
          {t.footer.related}{" "}
          <a
            href="https://github.com/singuerinc/spain-phone"
            target="_blank"
            rel="noopener noreferrer"
          >
            spain-phone
          </a>
        </p>
      </footer>
    </div>
  );
}
