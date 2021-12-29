import React, {useEffect, useRef} from "react";
import cn from "classnames";

const HeaderMobile = ({className, children, setHeaderHeight}) => {
  const headerMobileRef = useRef(null);

  useEffect(() => {
    if (headerMobileRef?.current?.clientHeight) {
      const clientHeight = headerMobileRef.current.clientHeight;
      setHeaderHeight(clientHeight);
    }
  });

  return (
    <div ref={headerMobileRef} className={cn("header-mobile_wrapper", className)}>
      <div className="header-mobile_inner-wrapper">{children}</div>
    </div>
  );
};

export default HeaderMobile;
