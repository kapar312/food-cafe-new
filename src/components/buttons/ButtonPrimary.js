import React from "react";
import cn from "classnames";

import {EButtonColor, EButtonSize} from "./consts";

const ButtonPrimary = ({
  type,
  className,
  isDisabled,
  onClick,
  onSubmit,
  image,
  isVisible = true,
  children,
  buttonColor,
  buttonSize,
  isShadow,
  value,
}) => {
  if (!isVisible) return null;

  return (
    <button
      disabled={isDisabled}
      onSubmit={onSubmit}
      onClick={onClick}
      value={value}
      type={type || "button"}
      className={cn(
        "btn-custom btn-custom-primary",
        className,
        `__${buttonColor || EButtonColor.default}`,
        `__${buttonSize || EButtonSize.md}`,
        {
          __disabled: isDisabled,
          __shadow: isShadow,
          __icon: image,
        }
      )}
    >
      {image && <img src={image} alt="icon" />}
      {children}
    </button>
  );
};

export default ButtonPrimary;
