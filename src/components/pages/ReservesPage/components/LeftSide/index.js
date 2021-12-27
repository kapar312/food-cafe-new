import React, {useEffect, useMemo, useState} from "react";
import {inject, observer} from "mobx-react";

import FieldCalendar from "../../../../formFields/FieldCalendar";
import FieldSwitch from "../../../../formFields/FieldSwitch";
import ModalNotAvailableReserve from "../../../../modals/ModalNotAvailableReserve";
import CalendarInfo from "../CalendarInfo";
import FormActions from "../FormActions";

import {EReservesTabsNames} from "../../../../../consts/reserves.const";

const LeftSide = inject("store")(
  observer(({store: {reserves}}) => {
    const [notAvailableModalVisible, setNotAvailableModalVisible] = useState(false);
    const [switchValue, setSwitchValue] = useState(false);

    const onSwitchClick = (name, nextChecked) => {
      const dateList = reserves.datesList;
      for (let i = 0; i < dateList?.length; i++) {
        if (dateList[i].date === reserves.selectedCalendarDate) {
          if (dateList[i].isAvailable && dateList[i].reservesCount > 0) {
            setNotAvailableModalVisible(true);
          } else setSwitchValue(nextChecked);
          break;
        }
      }
      console.log("nextChecked", nextChecked);
      reserves
        .handleReservationDate(
          reserves.selectedCalendarDate,
          nextChecked ? "Close" : "Open"
        )
        .finally(() => console.log("red"));
    };

    const onDatePickerClick = (name, date) => {
      reserves.setShowAllReservesActive(false);
    };

    useEffect(() => {
      reserves.setDatesList([]);
    }, [reserves]);

    const changeSwitchValue = () => {
      const dateInCalendar = reserves.datesList.find(
        (item) => item.date === reserves.selectedCalendarDate
      );
      if (dateInCalendar?.isAvailable !== undefined) {
        setSwitchValue(!dateInCalendar?.isAvailable);
      } else setSwitchValue(false);
    };

    useEffect(() => {
      changeSwitchValue();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reserves.selectedCalendarDate]);

    const switchContent = useMemo(() => {
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
            value={switchValue}
            isDisabled={!reserves.selectedCalendarDate}
          />
          Не принимать гостей
        </div>
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [switchValue, reserves.activeReservesTab, reserves.selectedCalendarDate]);

    return (
      <div className="reserves-page_left-side">
        <div className="reserves-page_head__wrapper">
          <h3 className="reserves-page_head__title">Выберите дату</h3>
          {reserves.selectedCalendarDate && (
            <div className="reserves-page_head__date">
              {reserves.selectedCalendarDate}
            </div>
          )}
        </div>
        <CalendarInfo />
        <div className="reserves-page_form__wrapper">
          <FieldCalendar
            fieldClassName="reserves-page_form__field"
            name="date"
            onChange={(name, date) => onDatePickerClick(name, date)}
            // customDatesArray={reserves.datesList}
            minDate={
              reserves.activeReservesTab === EReservesTabsNames.future
                ? new Date()
                : new Date(new Date().setFullYear(new Date().getFullYear() - 1))
            }
          />
          <FormActions />
        </div>
        {switchContent}
        <ModalNotAvailableReserve
          isVisible={notAvailableModalVisible}
          closeModal={() => setNotAvailableModalVisible(false)}
        />
      </div>
    );
  })
);

export default LeftSide;
