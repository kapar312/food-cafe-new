import React from "react";

import {COLOR_DEFAULT_DARK} from "../../../consts/colors.const";

const IconCross = ({color, className, width, height}) => (
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
      d="M7.41394 6.00012L11.7068 1.70721C12.0977 1.31622 12.0977 0.684236 11.7068 0.293244C11.3158 -0.097748 10.6838 -0.097748 10.2928 0.293244L6 4.58615L1.70718 0.293244C1.3162 -0.097748 0.684222 -0.097748 0.293238 0.293244C-0.0977459 0.684236 -0.0977459 1.31622 0.293238 1.70721L4.58606 6.00012L0.293238 10.293C-0.0977459 10.684 -0.0977459 11.316 0.293238 11.707C0.48823 11.902 0.744219 12 1.00021 12C1.2562 12 1.51219 11.902 1.70718 11.707L6 7.41409L10.2928 11.707C10.4878 11.902 10.7438 12 10.9998 12C11.2558 12 11.5118 11.902 11.7068 11.707C12.0977 11.316 12.0977 10.684 11.7068 10.293L7.41394 6.00012Z"
    />
  </svg>
);

export default IconCross;
