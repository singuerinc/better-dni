import { isNIEPrefix, type Reading } from "./parse";

const W = 640;
const H = 520;
const FONT = 80;
const CHAR = FONT * 0.6; // Courier Prime advance width
const PAD = 14;
const BOX_Y = 168;
const BOX_H = 120;
const TOP_NUMERAL_Y = 42;
const BOTTOM_NUMERAL_Y = 468;
const BOTTOM_SLOTS = [88, 243, 398, 553];

const API: Record<number, string> = {
  16: "normalize()",
  18: "isValid()",
  20: "isNIE()",
  22: "isNIF()",
};

type Part = {
  id: string;
  numeral: number;
  text: string;
  slots: number;
  flagged: boolean;
  empty: boolean;
  /** API numerals whose leaders start on this part. */
  api: number[];
};

function partsOf(reading: Reading, example: boolean): Part[] {
  if (!reading.shaped) {
    const slots = Math.min(Math.max(reading.normalized.length, 1), 10);
    return [
      {
        id: "raw",
        numeral: 12,
        text: reading.normalized.slice(0, slots),
        slots,
        flagged: true,
        empty: false,
        api: [16, 18, 20, 22],
      },
    ];
  }

  const parts: Part[] = [];
  const niePrefix = isNIEPrefix(reading.prefix);
  if (reading.prefix) {
    parts.push({
      id: "prefix",
      numeral: 10,
      text: reading.prefix,
      slots: 1,
      flagged: false,
      empty: false,
      api: niePrefix ? [16, 20] : [16, 22],
    });
  }
  parts.push({
    id: "body",
    numeral: 12,
    text: reading.body,
    slots: example ? reading.body.length : reading.prefix ? 7 : 8,
    flagged: false,
    empty: reading.body.length === 0,
    api: !reading.prefix ? [16, 20, 22] : niePrefix ? [22] : [20],
  });
  parts.push({
    id: "letter",
    numeral: 14,
    text: reading.letter,
    slots: 1,
    flagged:
      Boolean(reading.letter) &&
      reading.expected !== null &&
      reading.letter !== reading.expected,
    empty: !reading.letter,
    api: [18],
  });
  return parts;
}

export function Figure({
  reading,
  example,
}: {
  reading: Reading;
  example: boolean;
}) {
  const parts = partsOf(reading, example);
  const exploded = example || reading.complete || !reading.shaped;
  const gap = exploded ? 34 : 8;
  const widths = parts.map((p) => p.slots * CHAR + PAD * 2);
  const total = widths.reduce((a, b) => a + b, 0) + gap * (parts.length - 1);
  const topXs =
    parts.length === 1
      ? [W / 2]
      : parts.map((_, i) => 70 + (i * (W - 140)) / (parts.length - 1));

  let x = (W - total) / 2;
  const boxes = parts.map((part, i) => {
    const box = { part, x, w: widths[i] };
    x += widths[i] + gap;
    return box;
  });

  // Bottom leaders: start points spread along each part's lower edge, then
  // slots are handed out left to right so no two leaders cross.
  const origins = boxes
    .flatMap(({ part, x: bx, w }) =>
      part.api.map((numeral, k) => ({
        numeral,
        partId: part.id,
        localX: (w * (k + 1)) / (part.api.length + 1),
        absX: bx + (w * (k + 1)) / (part.api.length + 1),
      })),
    )
    .sort((a, b) => a.absX - b.absX)
    .map((origin, i) => ({ ...origin, slot: BOTTOM_SLOTS[i] }));

  const bodyBox = boxes.find((b) => b.part.id === "body");

  return (
    <svg
      className="figure"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={
        example
          ? "Figure 1, example: X1302311M exploded into prefix X, body 1302311 and control letter M, with leaders to normalize, isValid, isNIE and isNIF."
          : `Figure 1: ${reading.normalized || "empty"} exploded into its parts.`
      }
    >
      <defs>
        <pattern
          id="hatch"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="8" className="hatch-line" />
        </pattern>
        <pattern
          id="hatch-carmine"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="8" className="hatch-line carmine" />
        </pattern>
      </defs>

      {/* explode axis */}
      <line
        x1="12"
        x2={W - 12}
        y1={BOX_Y + BOX_H / 2}
        y2={BOX_Y + BOX_H / 2}
        className="axis"
      />

      {boxes.map(({ part, x: bx, w }, i) => {
        const nx = topXs[i] - bx;
        const carmine = part.flagged || part.id === "letter";
        const mine = origins.filter((o) => o.partId === part.id);
        return (
          <g
            key={part.id}
            className="part"
            style={{ transform: `translateX(${bx}px)` }}
          >
            <rect
              x="0"
              y={BOX_Y}
              width={w}
              height={BOX_H}
              className={`part-box${part.empty ? " is-empty" : ""}${carmine ? " is-carmine" : ""}`}
              fill={
                part.empty
                  ? "none"
                  : carmine
                    ? "url(#hatch-carmine)"
                    : "url(#hatch)"
              }
            />
            <text
              x={w / 2}
              y={BOX_Y + BOX_H / 2 + FONT * 0.34}
              className={`part-text${carmine ? " carmine" : ""}`}
              textAnchor="middle"
              fontSize={FONT}
            >
              {part.text}
            </text>
            {part.id === "letter" && part.empty && reading.expected && (
              <text
                x={w / 2}
                y={BOX_Y + BOX_H / 2 + FONT * 0.34}
                className="part-text ghost"
                textAnchor="middle"
                fontSize={FONT}
              >
                {reading.expected}
              </text>
            )}

            {/* leader up to the part numeral */}
            <path
              d={`M ${w / 2} ${BOX_Y - 5} C ${w / 2} ${BOX_Y - 80}, ${nx} ${TOP_NUMERAL_Y + 70}, ${nx} ${TOP_NUMERAL_Y + 14}`}
              className={`leader${carmine ? " carmine" : ""}`}
            />
            <circle
              cx={w / 2}
              cy={BOX_Y - 5}
              r="4"
              className={`leader-dot${carmine ? " carmine" : ""}`}
            />
            <text
              x={nx}
              y={TOP_NUMERAL_Y}
              textAnchor="middle"
              className={`numeral${carmine ? " carmine" : ""}`}
            >
              {part.numeral}
            </text>

            {/* leaders down to the API numerals */}
            {mine.map((o) => {
              const tx = o.slot - bx;
              const y0 = BOX_Y + BOX_H + 5;
              return (
                <g key={o.numeral}>
                  <path
                    d={`M ${o.localX} ${y0} C ${o.localX} ${y0 + 90}, ${tx} ${BOTTOM_NUMERAL_Y - 110}, ${tx} ${BOTTOM_NUMERAL_Y - 30}`}
                    className="leader"
                  />
                  <circle cx={o.localX} cy={y0} r="4" className="leader-dot" />
                </g>
              );
            })}
          </g>
        );
      })}

      {bodyBox && !bodyBox.part.empty && (
        <g className="part" style={{ transform: `translateX(${bodyBox.x}px)` }}>
          <line
            x1="0"
            x2={bodyBox.w}
            y1={BOX_Y - 22}
            y2={BOX_Y - 22}
            className="dimension"
          />
          <line
            x1="0"
            x2="0"
            y1={BOX_Y - 32}
            y2={BOX_Y - 12}
            className="dimension"
          />
          <line
            x1={bodyBox.w}
            x2={bodyBox.w}
            y1={BOX_Y - 32}
            y2={BOX_Y - 12}
            className="dimension"
          />
          <text
            x={bodyBox.w - 6}
            y={BOX_Y - 30}
            textAnchor="end"
            className="dimension-label"
          >
            {bodyBox.part.text.length} / {reading.prefix ? 7 : 8} digits
          </text>
        </g>
      )}

      {origins.map((o) => (
        <g key={o.numeral}>
          <text
            x={o.slot}
            y={BOTTOM_NUMERAL_Y}
            textAnchor="middle"
            className="numeral"
          >
            {o.numeral}
          </text>
          <text
            x={o.slot}
            y={BOTTOM_NUMERAL_Y + 30}
            textAnchor="middle"
            className="api-label"
          >
            {API[o.numeral]}
          </text>
        </g>
      ))}
    </svg>
  );
}
