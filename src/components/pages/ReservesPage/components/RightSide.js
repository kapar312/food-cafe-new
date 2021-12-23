import React from "react";

import TabsGroup from "./TabsGroup";
import Reservations from "./Reservations";

const RightSide = () => {
  return (
    <div className="reserves-page_right-side">
      <div className="reserves-page_head__wrapper">
        <h3 className="reserves-page_head__title">Резервы</h3>
        <TabsGroup />
      </div>
      <Reservations />
    </div>
  );
};

export default RightSide;
