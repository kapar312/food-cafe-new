import React, {useEffect} from "react";
import cn from "classnames";
import {inject, observer} from "mobx-react";

import ButtonPrimary from "../../../../buttons/ButtonPrimary";

import {EReservesTabsNames, reservesTabs} from "../../../../../consts/reserves.const";

const TabsGroup = inject("store")(
  observer(({store: {reserves}}) => {
    const onChangeValue = (event) => {
      reserves.setActiveReservesTab(event.target.value);
    };
    useEffect(() => {
      reserves.setActiveReservesTab(EReservesTabsNames.future);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div className="reserves-page_tabs__wrapper">
        {reservesTabs.map((item) => (
          <ButtonPrimary
            key={item.id}
            value={item.value}
            onClick={onChangeValue}
            className={cn("reserves-page_tabs__item", {
              _active: reserves.activeReservesTab === item.value,
            })}
          >
            {item.label}
          </ButtonPrimary>
        ))}
      </div>
    );
  })
);

export default TabsGroup;
