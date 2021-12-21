import React, {useState} from "react";

import Layout from "../../segments/Layout";
import FieldCalendar from "../../formFields/FieldCalendar";
import FieldSwitch from "../../formFields/FieldSwitch";
import ButtonPrimary from "../../buttons/ButtonPrimary";

import {EButtonColor} from "../../buttons/consts";

const ReservesPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const onSwitchClick = (name, nextChecked) => {
    console.log("onSwitchClick", name, nextChecked);
  };

  const onDatePickerClick = (name, date) => {
    console.log("valuevaluevalue", name, date);
    setSelectedDate(date);
  };

  return (
    <Layout headerTitle="Резервы">
      <div className="reserves-page_wrapper">
        <div className="reserves-page_inner-wrapper">
          <div className="reserves-page_left-side">
            <div className="reserves-page_title__wrapper">
              <h3 className="reserves-page_title__text">Выберите дату</h3>
              {selectedDate && (
                <div className="reserves-page_title__date">{selectedDate}</div>
              )}
            </div>
            <div className="reserves-page_form__wrapper">
              <FieldCalendar
                fieldClassName="reserves-page_form__field"
                name="date"
                onChange={(name, date) => onDatePickerClick(name, date)}
              />
              <div className="reserves-page_form__actions">
                <ButtonPrimary buttonColor={EButtonColor.default}>
                  Показать все бронирования
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
          <div className="reserves-page_right-side">
            <div className="reserves-page_title__wrapper">
              <h3 className="reserves-page_title__text">Выберите дату</h3>
              <div className="reserves-page_title__tabs">123</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReservesPage;
