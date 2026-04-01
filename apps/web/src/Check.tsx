const X_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
const CHECK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

export const Check = ({ check, label }: { check: boolean; label: string }) => (
  <div className="flex">
    <div className="mv1">
      <div className="w-100 cf">
        {!check && (
          <span
            className="red"
            dangerouslySetInnerHTML={{ __html: X_SVG }}
          />
        )}
        {check && (
          <span
            className="green"
            dangerouslySetInnerHTML={{ __html: CHECK_SVG }}
          />
        )}
      </div>
    </div>
    <div className="fw5 ml2 v-mid pv2">{label}</div>
  </div>
);
