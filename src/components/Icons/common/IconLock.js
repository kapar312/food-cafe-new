import React from "react";

import {COLOR_DEFAULT_DARK} from "../../../consts/colors.const";

const IconLock = ({color, className, width, height}) => (
  <svg
    width={width || "5"}
    height={height || "5"}
    className={className}
    viewBox="0 0 5 5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <rect
      width="4"
      height="3"
      rx="1.5"
      transform="matrix(-1 0 0 1 4.5 2)"
      fill={color || COLOR_DEFAULT_DARK}
    />
    <path
      d="M3.5 1.25C3.5 0.697715 3.05228 0.25 2.5 0.25C1.94772 0.25 1.5 0.697715 1.5 1.25V2.25H3.5V1.25Z"
      stroke={color || COLOR_DEFAULT_DARK}
      strokeWidth="0.5"
    />
    <path
      d="M2.125 3.26938C2.125 3.41174 2.20041 3.53604 2.3125 3.60254C2.3125 3.6401 2.3125 3.85522 2.3125 4.04345C2.3125 4.14701 2.39645 4.23092 2.5 4.23092C2.60355 4.23092 2.6875 4.14701 2.6875 4.04345C2.6875 3.85522 2.6875 3.6401 2.6875 3.60254C2.79959 3.53604 2.875 3.41174 2.875 3.26938C2.875 3.05696 2.70711 2.88477 2.5 2.88477C2.29289 2.88477 2.125 3.05696 2.125 3.26938Z"
      fill="white"
    />
  </svg>
);

export default IconLock;
