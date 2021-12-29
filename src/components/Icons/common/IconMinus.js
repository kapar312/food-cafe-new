import React from "react";

import {COLOR_DEFAULT_DARK} from "../../../consts/colors.const";

const IconMinus = ({color, className, width, height}) => (
  <svg
    width={width || "12"}
    height={height || "12"}
    fill={color || COLOR_DEFAULT_DARK}
    viewBox="0 0 384 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M368,0H16A16,16,0,0,0,0,16V48A16,16,0,0,0,16,64H368a16,16,0,0,0,16-16V16A16,16,0,0,0,368,0Z"
    />
  </svg>
);

export default IconMinus;
