import React from "react";

import ReservesList from "../ReservesList";
import TabsGroup from "../TabsGroup";

const RightSide = () => {
  return (
    <div className="reserves-page_right-side">
      <div className="reserves-page_head__wrapper">
        <h3 className="reserves-page_head__title">Резервы</h3>
        <TabsGroup />
      </div>
      <ReservesList />
    </div>
  );
};

export default RightSide;
