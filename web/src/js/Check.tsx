import * as React from "react";
import * as feather from "feather-icons";

export const Check = ({ check, label }) => (
  <div className="flex">
    <div className="mv1">
      <div className="w-100 cf">
        {!check && (
          <span dangerouslySetInnerHTML={{ __html: feather.icons.x.toSvg() }} />
        )}
        {check && (
          <span
            dangerouslySetInnerHTML={{ __html: feather.icons.check.toSvg() }}
          />
        )}
      </div>
    </div>
    <div className="fw5 ml2 v-mid pv2">{label}</div>
  </div>
);
