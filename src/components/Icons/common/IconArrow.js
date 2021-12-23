import React from "react";

import {COLOR_DEFAULT_DARK} from "../../../consts/colors.const";

const IconArrow = ({color, className, width, height}) => (
  <svg
    width={width || "10"}
    height={height || "16"}
    fill={color || COLOR_DEFAULT_DARK}
    className={className}
    viewBox="0 0 10 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.41353 0L0 8L8.41353 16L10 14.4915L3.17294 8L10 1.50849L8.41353 0Z"
    />
  </svg>
);

export default IconArrow;
