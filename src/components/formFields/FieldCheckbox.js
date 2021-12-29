import React from "react";
import cn from "classnames";
import {ErrorMessage, Field} from "formik";

import {checkError} from "../../helper/form.helper";

const FieldCheckbox = ({
  name,
  label,
  errorName,
  wrapperClassName,
  fieldClassName,
  errors,
  icon,
  value,
  haveCheckbox,
  isChecked,
}) => {
  return (
    <div
      className={cn("form-field_wrapper _checkbox", wrapperClassName, {
        _noCheckbox: !haveCheckbox,
        _checked: isChecked,
      })}
    >
      <div style={checkError(errors, name)} className="form-field_inner-wrapper">
        <label className="form-field_label">
          <Field
            name={name}
            className={cn("form-field_field", fieldClassName)}
            type="checkbox"
            value={value}
          />
          {icon && <span className="form-field_icon">{icon}</span>}
          {label}
        </label>
        {errorName && (
          <ErrorMessage name={errorName}>
            {(msg) => <p className="form-field_error">{msg}</p>}
          </ErrorMessage>
        )}
      </div>
    </div>
  );
};

export default FieldCheckbox;
