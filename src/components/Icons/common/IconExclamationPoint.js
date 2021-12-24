import React from "react";

import {COLOR_DEFAULT_DARK} from "../../../consts/colors.const";

const IconExclamationPoint = ({color, className, width, height}) => (
  <svg
    width={width || "4"}
    height={height || "14"}
    fill="none"
    viewBox="0 0 4 14"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 0C1.03503 0 0.25 0.7854 0.25 1.75079C0.25 2.7153 1.03503 3.5 2 3.5C2.96497 3.5 3.75 2.7153 3.75 1.75079C3.75 0.7854 2.96497 0 2 0Z"
      fill={color || COLOR_DEFAULT_DARK}
    />
    <path
      d="M2.00026 5.25C1.27527 5.25 0.6875 5.73971 0.6875 6.34375V12.9062C0.6875 13.5103 1.27527 14 2.00026 14C2.72526 14 3.31302 13.5103 3.31302 12.9062V6.34375C3.31302 5.73971 2.72526 5.25 2.00026 5.25Z"
      fill={color || COLOR_DEFAULT_DARK}
    />
  </svg>
);

export default IconExclamationPoint;
