import React from "react";
import cn from "classnames";

const CardWrapper = ({children, className}) => {
  return (
    <div className={cn("card_wrapper", className)}>
      <div className="card_inner-wrapper">{children}</div>
    </div>
  );
};

export default CardWrapper;
