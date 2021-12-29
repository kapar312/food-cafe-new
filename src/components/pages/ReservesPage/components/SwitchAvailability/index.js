import React, {useEffect, useMemo, useState} from "react";
import {inject, observer} from "mobx-react";

import FieldSwitch from "../../../../formFields/FieldSwitch";

import {
  EReservesDateStatus,
  EReservesTabsNames,
} from "../../../../../consts/reserves.const";
import {convertDateToDMYFormat} from "../../../../../helper/time.helper";

const SwitchAvailability = inject("store")(
  observer(({store: {reserves}, openModal}) => {
    const [switchValue, setSwitchValue] = useState(false);

    const changeSwitchValue = () => {
      const dateInCalendar = reserves.datesList?.find(
        (item) => item.date === convertDateToDMYFormat(reserves.selectedCalendarDate)
      );
      if (dateInCalendar?.isAvailable !== undefined) {
        setSwitchValue(!dateInCalendar?.isAvailable);
      } else setSwitchValue(false);
    };

    const onSwitchClick = (name, nextChecked) => {
      console.log("123");
      const dateList = reserves.datesList;
      for (let i = 0; i < dateList?.length; i++) {
        if (dateList[i].date === convertDateToDMYFormat(reserves.selectedCalendarDate)) {
          if (dateList[i].isAvailable && dateList[i].reservesCount > 0) {
            openModal();
          } else {
            setSwitchValue(nextChecked);
            reserves.handleReservationDate(
              convertDateToDMYFormat(reserves.selectedCalendarDate),
              nextChecked ? EReservesDateStatus.close : EReservesDateStatus.open
            );
          }
          break;
        }
      }
    };

    useEffect(() => {
      changeSwitchValue();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reserves.selectedCalendarDate]);

    return useMemo(() => {
      if (
        reserves.activeReservesTab === EReservesTabsNames.confirmed ||
        reserves.activeReservesTab === EReservesTabsNames.history
      ) {
        return <></>;
      }
      return (
        <div className="reserves-page_switch__wrapper">
          <FieldSwitch
            name="isAvailable"
            onChange={(name, value) => onSwitchClick(name, value)}
            value={switchValue}
            isDisabled={!reserves.selectedCalendarDate}
          />
          Не принимать гостей
        </div>
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reserves.activeReservesTab, reserves.selectedCalendarDate, switchValue]);
  })
);

export default SwitchAvailability;
