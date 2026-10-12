import type { ReactNode } from "react";

const Icon = ({ children }: { children: ReactNode }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

export const Check = ({ check, label }: { check: boolean; label: string }) => (
  <div className="flex">
    <div className="mv1">
      <div className="w-100 cf">
        {!check && (
          <span className="red">
            <Icon>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </Icon>
          </span>
        )}
        {check && (
          <span className="green">
            <Icon>
              <polyline points="20 6 9 17 4 12" />
            </Icon>
          </span>
        )}
      </div>
    </div>
    <div className="fw5 ml2 v-mid pv2">{label}</div>
  </div>
);
