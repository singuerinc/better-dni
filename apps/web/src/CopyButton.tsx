import { useEffect, useState, type ReactNode } from "react";
import { t } from "./i18n";

export function CopyButton({
  text,
  className = "control",
  children,
  label,
}: {
  text: string;
  className?: string;
  children: ReactNode;
  label: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard can be blocked (insecure context, permissions); the text stays selectable.
    }
  };

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={handleCopy}
        aria-label={label}
      >
        {copied ? <span className="control-copied">{t.copied}</span> : children}
      </button>
      <span className="sr-only" role="status">
        {copied ? t.copiedStatus(text) : ""}
      </span>
    </>
  );
}
