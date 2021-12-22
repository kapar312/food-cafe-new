import React from "react";
import TabsGroup from "./TabsGroup";

const RightSide = () => {
  return (
    <div className="reserves-page_right-side">
      <div className="reserves-page_title__wrapper">
        <h3 className="reserves-page_title__text">Резервы</h3>
        <div className="reserves-page_title__tabs">
          <TabsGroup />
        </div>
      </div>
      <div className="reserves-page_list__wrapper">
        <div className="reserves-page_item__wrapper">123</div>
        <div className="reserves-page_item__wrapper">123</div>
        <div className="reserves-page_item__wrapper">123</div>
      </div>
    </div>
  );
};

export default RightSide;
