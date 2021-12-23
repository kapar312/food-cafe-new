import React, {useState} from "react";

import FieldCalendar from "../../../formFields/FieldCalendar";
import ButtonPrimary from "../../../buttons/ButtonPrimary";
import FieldSwitch from "../../../formFields/FieldSwitch";

import {EButtonColor} from "../../../buttons/consts";
import CalendarInfo from "./CalendarInfo";
import {inject, observer} from "mobx-react";

const LeftSide = inject("store")(
  observer(({store: {reserves}}) => {
    const [selectedDate, setSelectedDate] = useState("");
    const onSwitchClick = (name, nextChecked) => {
      console.log("selectedCalendarDate", reserves.selectedCalendarDate);
    };

    const onDatePickerClick = (name, date) => {
      setSelectedDate(date);
    };

    return (
      <div className="reserves-page_left-side">
        <div className="reserves-page_head__wrapper">
          <h3 className="reserves-page_head__title">Выберите дату</h3>
          {selectedDate && <div className="reserves-page_head__date">{selectedDate}</div>}
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
        <div className="reserves-page_switch__wrapper">
          <FieldSwitch
            name="isAvailable"
            onChange={(name, value) => onSwitchClick(name, value)}
          />
          Не принимать гостей
        </div>
      </div>
    );
  })
);

export default LeftSide;
