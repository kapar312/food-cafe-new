import React, {useEffect, useMemo, useState} from "react";
import {inject, observer} from "mobx-react";

import FieldCalendar from "../../../formFields/FieldCalendar";
import ButtonPrimary from "../../../buttons/ButtonPrimary";
import FieldSwitch from "../../../formFields/FieldSwitch";

import {EButtonColor} from "../../../buttons/consts";
import CalendarInfo from "./CalendarInfo";
import {datesMockups} from "../../../../mockup/datesMockup";
import ModalNotAvailableReserve from "../../../modals/ModalNotAvailableReserve";

const LeftSide = inject("store")(
  observer(({store: {reserves}}) => {
    const [notAvailableModalVisible, setNotAvailableModalVisible] = useState(false);
    const [switchValue, setSwitchValue] = useState(false);

    const onSwitchClick = (name, nextChecked) => {
      for (let i = 0; i < datesMockups.length; i++) {
        if (datesMockups[i].date === reserves.selectedCalendarDate) {
          if (datesMockups[i].isAvailable && datesMockups[i].reservesCount > 0) {
            setNotAvailableModalVisible(true);
          } else setSwitchValue(nextChecked);
          break;
        }
      }
    };

    const onDatePickerClick = (name, date) => {
      console.log("onDatePickerClick", name, date);
    };

    useEffect(() => {
      reserves.setDatesList(datesMockups);
    }, [reserves]);

    const changeSwitchValue = () => {
      const dateInCalendar = datesMockups.find(
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
      return (
        <div className="reserves-page_switch__wrapper">
          <FieldSwitch
            name="isAvailable"
            onChange={(name, value) => onSwitchClick(name, value)}
            value={switchValue}
          />
          Не принимать гостей
        </div>
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [switchValue]);

    useEffect(() => {
      console.log("switchValue", switchValue);
      console.log("switchValue", switchValue);
    }, [switchValue]);

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
            customDatesArray={reserves.datesList}
          />
          <div className="reserves-page_form__actions">
            <ButtonPrimary buttonColor={EButtonColor.default}>
              Показать все бронирования в этом месяце
            </ButtonPrimary>
          </div>
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
