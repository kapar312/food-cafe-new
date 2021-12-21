import React from "react";

import {COLOR_DEFAULT_DARK} from "../../../consts/colors.const";

const IconEye = ({color, className, width, height}) => (
  <svg
    width={width || "16"}
    height={height || "17"}
    fill="none"
    viewBox="0 0 16 17"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="7.99998" cy="8.5001" r="2.4" fill={color || COLOR_DEFAULT_DARK} />
    <path
      d="M14.9293 8.49991C13.4617 12.1245 10.463 13.0999 8 13.0999C5.53704 13.0999 2.53833 12.1245 1.07071 8.4999C2.53833 4.87532 5.53704 3.8999 8 3.8999C10.463 3.8999 13.4617 4.87532 14.9293 8.49991Z"
      stroke={color || COLOR_DEFAULT_DARK}
      strokeWidth="2"
    />
  </svg>
);

export default IconEye;
