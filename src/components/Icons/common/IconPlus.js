import React from "react";

import {COLOR_DEFAULT_DARK} from "../../../consts/colors.const";

const IconPlus = ({color, className, width, height}) => (
  <svg
    width={width || "12"}
    height={height || "12"}
    fill={color || COLOR_DEFAULT_DARK}
    viewBox="0 0 12 12"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.09704 11.6197H7.54717V7.45646H11.752V4.25401H7.54717V0.0908203H4.09704V4.25401H0V7.45646H4.09704V11.6197Z"
    />
  </svg>
);

export default IconPlus;
