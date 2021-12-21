import React from "react";
import {Link} from "react-router-dom";
import cn from "classnames";

import {EButtonColor, EButtonSize} from "./consts";

const ButtonLink = ({
  className,
  target,
  hrefTo,
  children,
  isDisabled,
  isShadow,
  buttonColor,
  buttonSize,
}) => {
  return hrefTo || !isDisabled ? (
    <Link
      to={hrefTo}
      className={cn(
        "btn-custom btn-custom-link",
        className,
        `__${buttonColor || EButtonColor.default}`,
        `__${buttonSize || EButtonSize.md}`,
        {
          __disabled: isDisabled,
          __shadow: isShadow,
        }
      )}
      target={target}
    >
      {children}
    </Link>
  ) : (
    <span
      className={cn(
        "btn-custom btn-custom-link __disabled",
        className,
        `__${buttonColor || EButtonColor.default}`,
        `__${buttonSize || EButtonSize.md}`,
        {
          __shadow: isShadow,
        }
      )}
    >
      {children}
    </span>
  );
};

export default ButtonLink;
