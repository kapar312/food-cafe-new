import React, {useEffect, useMemo} from "react";
import {inject, observer} from "mobx-react";

import FieldSwitch from "../../../../formFields/FieldSwitch";

import {
  EReservesDateStatus,
  EReservesTabsNames,
} from "../../../../../consts/reserves.const";
import {convertDateToDMYFormat} from "../../../../../helper/time.helper";

const SwitchAvailability = inject("store")(
  observer(({store: {reserves}, openModal}) => {
    const changeSwitchValue = () => {
      const dateInCalendar = reserves.datesList?.find(
        (item) => item.date === convertDateToDMYFormat(reserves.selectedCalendarDate)
      );
      if (dateInCalendar?.isAvailable !== undefined) {
        reserves.setSelectedDateStatus(
          dateInCalendar?.isAvailable
            ? EReservesDateStatus.open
            : EReservesDateStatus.close
        );
      } else reserves.setSelectedDateStatus(reserves.selectedDateStatus);
    };

    const onSwitchClick = (name, nextChecked) => {
      console.log("123");
      const dateList = reserves.datesList;
      for (let i = 0; i < dateList?.length; i++) {
        if (dateList[i].date === convertDateToDMYFormat(reserves.selectedCalendarDate)) {
          if (dateList[i].isAvailable && dateList[i].reservesCount > 0) {
            openModal();
          } else {
            reserves.handleReservationDate(
              convertDateToDMYFormat(reserves.selectedCalendarDate),
              nextChecked ? EReservesDateStatus.close : EReservesDateStatus.open
            );
            reserves.setSelectedDateStatus(
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
    }, [reserves.datesList]);

    useEffect(() => {
      console.log("reserves.selectedDateStatus", reserves.selectedDateStatus);
    }, [reserves.selectedDateStatus]);

    return useMemo(() => {
      if (
        reserves.activeReservesTab === EReservesTabsNames.confirmed ||
        reserves.activeReservesTab === EReservesTabsNames.history ||
        !reserves.selectedCalendarDate
      ) {
        return <></>;
      }
      return (
        <div className="reserves-page_switch__wrapper">
          <FieldSwitch
            name="isAvailable"
            onChange={(name, value) => onSwitchClick(name, value)}
            value={reserves.selectedDateStatus === EReservesDateStatus.close}
            isDisabled={!reserves.selectedCalendarDate}
          />
          Не принимать гостей
        </div>
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      reserves.activeReservesTab,
      reserves.selectedCalendarDate,
      reserves.selectedDateStatus,
    ]);
  })
);

export default SwitchAvailability;
