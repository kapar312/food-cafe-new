import React from "react";

import {COLOR_DEFAULT_DARK} from "../../../consts/colors.const";

const IconCheck = ({color, className, width, height}) => (
  <svg
    width={width || "12"}
    height={height || "10"}
    fill={color || COLOR_DEFAULT_DARK}
    viewBox="0 0 12 10"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.28033 4.43451C0.987436 4.12209 0.512563 4.12209 0.21967 4.43451C-0.0732233 4.74693 -0.0732233 5.25346 0.21967 5.56588L3.96967 9.56588C4.27351 9.88998 4.77001 9.87605 5.05747 9.53537L11.8075 1.53537C12.0846 1.20697 12.0596 0.701134 11.7517 0.405567C11.4438 0.11 10.9696 0.136622 10.6925 0.46503L4.47135 7.83827L1.28033 4.43451Z"
    />
  </svg>
);

export default IconCheck;
