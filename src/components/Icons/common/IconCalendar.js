import React from "react";

import {COLOR_DEFAULT_DARK} from "../../../consts/colors.const";

const IconCalendar = ({color, className, width, height}) => (
  <svg
    width={width || "16"}
    height={height || "16"}
    fill="none"
    viewBox="0 0 16 16"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.75"
      y="2.75"
      width="14.5"
      height="12.5"
      rx="2.25"
      stroke={color || COLOR_DEFAULT_DARK}
      strokeWidth="1.5"
    />
    <line
      x1="1"
      y1="6"
      x2="15"
      y2="6"
      stroke={color || COLOR_DEFAULT_DARK}
      strokeWidth="2"
    />
    <line
      x1="12"
      y1="2"
      x2="12"
      y2="1"
      stroke={color || COLOR_DEFAULT_DARK}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="4"
      y1="2"
      x2="4"
      y2="1"
      stroke={color || COLOR_DEFAULT_DARK}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <rect x="9" y="9" width="4" height="4" rx="1" fill={color || COLOR_DEFAULT_DARK} />
  </svg>
);

export default IconCalendar;
