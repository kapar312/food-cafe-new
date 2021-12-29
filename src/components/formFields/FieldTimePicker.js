import React from "react";
import TimePicker from "rc-time-picker";
import cn from "classnames";
import {ErrorMessage} from "formik";

import {checkError} from "../../helper/form.helper";

const FieldTimePicker = ({
  name,
  placeholder,
  label,
  errorName,
  wrapperClassName,
  fieldClassName,
  errors,
  popupClassName,
  onChange,
  minuteStep,
}) => {
  return (
    <div className={cn("form-field_wrapper _timepicker", wrapperClassName)}>
      {label && <label className="form-field_label">{label}</label>}
      <div style={checkError(errors, name)} className="form-field_inner-wrapper">
        <TimePicker
          className={cn("form-field_field", fieldClassName)}
          showSecond={false}
          placeholder={placeholder || "00:00"}
          popupClassName={cn("form-field_timepicker__dropdown", popupClassName)}
          minuteStep={minuteStep || 5}
          onChange={(e) => onChange(e?.format("HH:mm:ss"))}
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

export default FieldTimePicker;
