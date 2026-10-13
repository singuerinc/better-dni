import { t } from "./i18n";

const today = new Date()
  .toLocaleDateString(t.numberLocale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
  .toUpperCase();

// 2πr for the r=58 ring the text runs on.
const RING_LENGTH = 2 * Math.PI * 58;

export function Stamp({
  valid,
  kind,
  className = "",
}: {
  valid: boolean;
  kind: "NIE" | "NIF" | null;
  className?: string;
}) {
  const ringId = `stamp-ring${className ? `-${className}` : ""}`;
  return (
    <div
      className={`stamp${valid ? " is-valid" : ""} ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 160 160">
        <defs>
          <path
            id={ringId}
            d="M 80 80 m -58 0 a 58 58 0 1 1 116 0 a 58 58 0 1 1 -116 0"
          />
        </defs>
        <circle cx="80" cy="80" r="74" className="stamp-rim" />
        <circle cx="80" cy="80" r="46" className="stamp-rim thin" />
        <text className="stamp-ring-text">
          <textPath
            href={`#${ringId}`}
            textLength={RING_LENGTH - 4}
            lengthAdjust="spacing"
          >
            {t.stamp.ring}
          </textPath>
        </text>
        {valid ? (
          <>
            <text x="80" y="60" textAnchor="middle" className="stamp-sub">
              {kind}
            </text>
            <text x="80" y="87" textAnchor="middle" className="stamp-main">
              {t.stamp.valid}
            </text>
            <text x="80" y="104" textAnchor="middle" className="stamp-sub">
              {today}
            </text>
          </>
        ) : (
          <text
            x="80"
            y="86"
            textAnchor="middle"
            className="stamp-main pending"
            textLength={t.stamp.pendingWidth}
            lengthAdjust={t.stamp.pendingWidth ? "spacingAndGlyphs" : undefined}
          >
            {t.stamp.pending}
          </text>
        )}
      </svg>
    </div>
  );
}
