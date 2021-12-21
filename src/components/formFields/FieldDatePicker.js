import React from "react";
import cn from "classnames";
import {ErrorMessage} from "formik";
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";

const FieldDatePicker = ({
  name,
  placeholder,
  label,
  type = "text",
  errorName,
  wrapperClassName,
  fieldClassName,
  autoComplete,
  defaultValue,
}) => {
  const onFiledChange = (date) => {
    const selectedDate = new Date(date).getDate();
    const selectedMonth = new Date(date).getMonth();
    const selectedYear = new Date(date).getFullYear();
    console.log("date", date);
    console.log("selectedDate", selectedDate, ".", selectedMonth, ".", selectedYear);
  };

  return (
    <div className={cn("form-field_wrapper _input", wrapperClassName)}>
      {label && <label className="form-field_label">{label}</label>}
      <div className="form-field_inner-wrapper">
        <DatePicker inline={true} locale={ru} onChange={(date) => onFiledChange(date)} />
        {errorName && (
          <ErrorMessage name={errorName}>
            {(msg) => <p className="form-field_error">{msg}</p>}
          </ErrorMessage>
        )}
      </div>
    </div>
  );
};

export default FieldDatePicker;
