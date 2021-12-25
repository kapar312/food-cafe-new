import React, {useState, useEffect} from "react";
import {useMediaQuery} from "react-responsive";

import Sidebar from "../Sidebar";
import Header from "../Header";
import {mediaBreakpoints} from "../../../consts/mediaBreakpoints";
import HeaderMobile from "../HeaderMobile";

const Layout = ({
  children,
  headerTitle,
  headerButton,
  headerMobileContent,
  headerClassName,
  headerMobileClassName,
}) => {
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [layoutSpaceParams, setLayoutSpaceParams] = useState({
    top: 0,
    left: 0,
  });

  const isTablet = useMediaQuery({
    minWidth: mediaBreakpoints.xsMedia,
    maxWidth: mediaBreakpoints.mdMediaZ,
  });

  useEffect(() => {
    setLayoutSpaceParams({top: headerHeight, left: sidebarWidth});
  }, [sidebarWidth, headerHeight]);

  return (
    <div
      className="layout_wrapper"
      style={{
        paddingTop: layoutSpaceParams.top,
        paddingLeft: !isTablet && layoutSpaceParams.left,
      }}
    >
      {isTablet ? (
        <HeaderMobile
          setHeaderHeight={setHeaderHeight}
          children={headerMobileContent}
          className={headerMobileClassName}
        />
      ) : (
        <Header
          headerTitle={headerTitle}
          setHeaderHeight={setHeaderHeight}
          sidebarWidth={sidebarWidth}
          headerButton={headerButton}
          className={headerClassName}
        />
      )}
      {!isTablet && <Sidebar setSidebarWidth={setSidebarWidth} />}
      <div className="layout_inner-wrapper">{children}</div>
    </div>
  );
};

export default Layout;
