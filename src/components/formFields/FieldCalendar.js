import React from "react";
import cn from "classnames";
import {ErrorMessage} from "formik";
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";
import {isFunction} from "lodash";
import {addZeroBefore} from "../../helper/time.helper";
import IconLock from "../Icons/common/IconLock";
import {inject, observer} from "mobx-react";

const FieldCalendar = inject("store")(
  observer(
    ({
      store: {reserves},
      name,
      label,
      errorName,
      wrapperClassName,
      fieldClassName,
      onChange,
      defaultValue,
      customDatesArray,
      minDate,
      selected,
    }) => {
      const onFiledChange = (date) => {
        const selectedDay = addZeroBefore(new Date(date).getDate());
        const selectedMonth = addZeroBefore(new Date(date).getMonth() + 1);
        const selectedYear = new Date(date).getFullYear();
        const fullDate = `${selectedDay}.${selectedMonth}.${selectedYear}`;
        reserves.setSelectedCalendarDate(fullDate);
        if (isFunction(onChange)) {
          onChange(name, fullDate);
        }
      };

      const createDate = (availableIndex, dayIndex, date) => {
        if (Number.isInteger(availableIndex)) {
          return (
            <div className="react-datepicker__day--inner _disabled">
              {date}
              <span className="react-datepicker__day--inner-sup">
                <IconLock width={7} height={7} />
              </span>
            </div>
          );
        } else if (
          Number.isInteger(dayIndex) &&
          !!customDatesArray[dayIndex].reservesCount
        ) {
          return (
            <div className="react-datepicker__day--inner">
              {date}{" "}
              <span className="react-datepicker__day--inner-sup">
                <i />
              </span>
            </div>
          );
        } else return <div className="react-datepicker__day--inner">{date}</div>;
      };

      const renderDays = (day, date) => {
        const customDate = new Date(date).getDate();
        const selectedDay = addZeroBefore(new Date(date).getDate());
        const selectedMonth = addZeroBefore(new Date(date).getMonth() + 1);
        const selectedYear = new Date(date).getFullYear();
        const fullDate = `${selectedDay}.${selectedMonth}.${selectedYear}`;
        let arrayDayIndex = null;
        let arrayIsAvailableIndex = null;
        for (let i = 0; i < customDatesArray.length; i++) {
          if (customDatesArray[i].date === fullDate) {
            arrayDayIndex = i;
            if (!customDatesArray[i].isAvailable) {
              arrayIsAvailableIndex = i;
              break;
            }
          }
        }
        return createDate(arrayIsAvailableIndex, arrayDayIndex, customDate);
      };

      return (
        <div className={cn("form-field_wrapper _calendar", wrapperClassName)}>
          {label && <label className="form-field_label">{label}</label>}
          <div className="form-field_inner-wrapper">
            <DatePicker
              selected={selected}
              inline={true}
              locale={ru}
              onChange={(date) => onFiledChange(date)}
              calendarClassName={cn("form-field_field", fieldClassName)}
              showNavigation={false}
              renderDayContents={!!customDatesArray?.length && renderDays}
              minDate={minDate}
            />
            {errorName && (
              <ErrorMessage name={errorName}>
                {(msg) => <p className="form-field_error">{msg}</p>}
              </ErrorMessage>
            )}
          </div>
        </div>
      );
    }
  )
);

export default FieldCalendar;
