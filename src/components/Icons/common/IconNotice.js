import React from "react";

import {COLOR_DEFAULT_DARK} from "../../../consts/colors.const";

const IconNotice = ({color, className, width, height}) => (
  <svg
    width={width || "14"}
    height={height || "16"}
    fill={color || COLOR_DEFAULT_DARK}
    viewBox="0 0 14 16"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.36094 15.7573C1.66902 16.3133 0.600098 15.8524 0.600098 14.9982V2.99971C0.600098 1.34302 2.03279 0 3.8001 0H10.2001C11.9674 0 13.4001 1.34302 13.4001 2.99971V14.9982C13.4001 15.8524 12.3312 16.3133 11.6393 15.7573L7.0001 12.3157L2.36094 15.7573ZM11.2668 12.8242V2.99971C11.2668 2.44748 10.7892 1.99981 10.2001 1.99981H3.8001C3.21099 1.99981 2.73343 2.44748 2.73343 2.99971V12.8242L6.30592 10.2396C6.70538 9.9186 7.29482 9.9186 7.69427 10.2396L11.2668 12.8242Z"
    />
  </svg>
);

export default IconNotice;
