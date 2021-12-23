import React, {useRef, useEffect} from "react";

const Header = ({headerTitle, setHeaderHeight, sidebarWidth, headerButton}) => {
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef?.current?.clientHeight) {
      const clientHeight = headerRef.current.clientHeight;
      setHeaderHeight(clientHeight);
    }
  });

  return (
    <div className="header_wrapper" ref={headerRef} style={{left: sidebarWidth}}>
      <div className="header_inner-wrapper">
        {headerTitle && <h2 className="header_title">{headerTitle}</h2>}
        {headerButton && <div className="header_actions__wrapper">{headerButton}</div>}
      </div>
    </div>
  );
};

export default Header;
