import React, {useEffect, useMemo, useState} from "react";
import {inject, observer} from "mobx-react";

import FieldCalendar from "../../../../formFields/FieldCalendar";
import ModalNotAvailableReserve from "../../../../modals/ModalNotAvailableReserve";
import CalendarInfo from "../CalendarInfo";
import FormActions from "../FormActions";

import {EReservesTabsNames} from "../../../../../consts/reserves.const";
import SwitchAvailability from "../SwitchAvailability";
import {convertDateToDMYFormat} from "../../../../../helper/time.helper";

const LeftSide = inject("store")(
  observer(({store: {reserves}}) => {
    const [notAvailableModalVisible, setNotAvailableModalVisible] = useState(false);

    const onDatePickerClick = (name, date) => {
      console.log("date", date);
      // const newDate = new Date(date, "dd.MM.yyyy");
      // console.log("newDate", newDate);
      reserves.setShowAllReservesActive(false);
    };

    useEffect(() => {
      reserves.getDatesList();
      reserves.setSelectedCalendarDate(new Date());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //   console.log("selectedCalendarMonth", reserves.selectedCalendarMonth);
    //   console.log("selectedCalendarMonth", reserves.selectedCalendarYear);
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [reserves.selectedCalendarMonth]);

    const calendarContent = useMemo(() => {
      return (
        <FieldCalendar
          fieldClassName="reserves-page_form__field"
          name="date"
          selected={reserves.selectedCalendarDate}
          onChange={(name, date) => onDatePickerClick(name, date)}
          customDatesArray={reserves.datesList}
          minDate={
            reserves.activeReservesTab === EReservesTabsNames.future
              ? new Date()
              : new Date(new Date().setFullYear(new Date().getFullYear() - 1))
          }
          maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
        />
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reserves.activeReservesTab, reserves.datesList, reserves.selectedCalendarDate]);

    return (
      <div className="reserves-page_left-side">
        <div className="reserves-page_head__wrapper">
          <h3 className="reserves-page_head__title">Выберите дату</h3>
          {reserves.selectedCalendarDate && (
            <div className="reserves-page_head__date">
              {convertDateToDMYFormat(reserves.selectedCalendarDate)}
            </div>
          )}
        </div>
        <CalendarInfo />
        <div className="reserves-page_form__wrapper">
          {calendarContent}
          <FormActions />
        </div>
        <SwitchAvailability openModal={() => setNotAvailableModalVisible(true)} />
        <ModalNotAvailableReserve
          isVisible={notAvailableModalVisible}
          closeModal={() => setNotAvailableModalVisible(false)}
        />
      </div>
    );
  })
);

export default LeftSide;
