import React, {useState, useEffect} from "react";

import Sidebar from "../Sidebar";
import Header from "../Header";

const Layout = ({children, headerTitle, headerButton}) => {
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [layoutSpaceParams, setLayoutSpaceParams] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    setLayoutSpaceParams({top: headerHeight, left: sidebarWidth});
  }, [sidebarWidth, headerHeight]);

  return (
    <div
      className="layout_wrapper"
      style={{paddingTop: layoutSpaceParams.top, paddingLeft: layoutSpaceParams.left}}
    >
      <Header
        headerTitle={headerTitle}
        setHeaderHeight={setHeaderHeight}
        sidebarWidth={sidebarWidth}
        headerButton={headerButton}
      />
      <Sidebar setSidebarWidth={setSidebarWidth} />
      <div className="layout_inner-wrapper">{children}</div>
    </div>
  );
};

export default Layout;
