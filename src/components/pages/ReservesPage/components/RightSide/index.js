import React from "react";

import ReservesList from "../ReservesList";
import TabsGroup from "../TabsGroup";
import {inject, observer} from "mobx-react";

const RightSide = inject("store")(
  observer(({store: {reserves}}) => {
    return (
      <div className="reserves-page_right-side">
        <div className="reserves-page_head__wrapper">
          <h3 className="reserves-page_head__title">
            Резервы <b>{reserves.reservesListByDate?.length}</b>
          </h3>
          <TabsGroup />
        </div>
        <ReservesList />
      </div>
    );
  })
);

export default RightSide;
