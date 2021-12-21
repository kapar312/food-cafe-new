import React from "react";
import cn from "classnames";
import {ErrorMessage} from "formik";
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";
import {isFunction} from "lodash";
import {addZeroBefore} from "../../helper/time.helper";

const FieldCalendar = ({
  name,
  label,
  errorName,
  wrapperClassName,
  fieldClassName,
  onChange,
  defaultValue,
}) => {
  const onFiledChange = (date) => {
    const selectedDate = addZeroBefore(new Date(date).getDate());
    const selectedMonth = addZeroBefore(new Date(date).getMonth());
    const selectedYear = new Date(date).getFullYear();
    const fullDate = `${selectedDate}.${selectedMonth}.${selectedYear}`;
    if (isFunction(onChange)) {
      onChange(name, fullDate);
    }
  };

  return (
    <div className={cn("form-field_wrapper _calendar", wrapperClassName)}>
      {label && <label className="form-field_label">{label}</label>}
      <div className="form-field_inner-wrapper">
        <DatePicker
          inline={true}
          locale={ru}
          onChange={(date) => onFiledChange(date)}
          calendarClassName={cn("form-field_field", fieldClassName)}
          showNavigation={false}
        />
        {errorName && (
          <ErrorMessage name={errorName}>
            {(msg) => <p className="form-field_error">{msg}</p>}
          </ErrorMessage>
        )}
      </div>
    </div>
  );
};

export default FieldCalendar;
