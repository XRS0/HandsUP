import React from "react";

import "./Loader.scss";

const VIEW = 80;
const RADIUS = VIEW / 2 - 3;
const MAX = 2*Math.PI * RADIUS;

type OwnProps = {
  subtitle?: React.ReactNode;
  isCancellable?: boolean;
  onCancel?: () => {};
  /** Number between ``0`` and ``100``. */
  progress?: number;
}

const Loader: React.FC<OwnProps> = ({ 
  subtitle, 
  progress=50,
  isCancellable,
  onCancel
}) => {
  return (
    <div className="Loader">
      <div className="spinner">
        <svg version="1.1" viewBox="0 0 80 80">
          <circle 
            r={RADIUS}
            cx={VIEW / 2}
            cy={VIEW / 2}
            strokeDasharray={`${progress / 100 * MAX} ${MAX}`}
          />
        </svg>

        {/* {isCancellable && <Icon 
          name="close"
          className="cancel-loading"
          onClick={onCancel}
        />} */}
      </div>
				
      {subtitle && <span className="subtitle">{subtitle}</span>}
    </div>
  );
}

export default Loader;