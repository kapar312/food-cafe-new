import React, {useRef, useEffect} from "react";
import cn from "classnames";

const Header = ({
  headerTitle,
  setHeaderHeight,
  sidebarWidth,
  className,
  headerButton,
}) => {
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef?.current?.clientHeight) {
      const clientHeight = headerRef.current.clientHeight;
      setHeaderHeight(clientHeight);
    }
  });

  return (
    <div
      className={cn("header_wrapper", className)}
      ref={headerRef}
      style={{left: sidebarWidth}}
    >
      <div className="header_inner-wrapper">
        {headerTitle && <h2 className="header_title">{headerTitle}</h2>}
        {headerButton && <div className="header_actions__wrapper">{headerButton}</div>}
      </div>
    </div>
  );
};

export default Header;
