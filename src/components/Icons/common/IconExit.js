import React from "react";

import {COLOR_DEFAULT_DARK} from "../../../consts/colors.const";

const IconExit = ({color, className, width, height}) => (
  <svg
    width={width || "21"}
    height={height || "20"}
    fill="none"
    viewBox="0 0 21 20"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 6.31818V4C15 2.34315 13.6569 1 12 1H4C2.34315 1 1 2.34315 1 4V16C1 17.6569 2.34315 19 4 19H12C13.6569 19 15 17.6569 15 16V13.6818"
      stroke={color || COLOR_DEFAULT_DARK}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 10.2273H20M20 10.2273L17.7083 7.5M20 10.2273L17.7083 12.5"
      stroke={color || COLOR_DEFAULT_DARK}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default IconExit;
