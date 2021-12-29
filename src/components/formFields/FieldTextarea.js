import React, {useState} from "react";
import cn from "classnames";
import {ErrorMessage, Field} from "formik";

import {checkError} from "../../helper/form.helper";

const FieldTextarea = ({
  name,
  placeholder,
  label,
  errorName,
  wrapperClassName,
  fieldClassName,
  errors,
  charCounter,
  maxChar,
  onChange,
  defaultValue,
}) => {
  const [value, setValue] = useState(defaultValue || "");

  const handleChangeValue = (e) => {
    const val = e.target.value.substr(0, maxChar || 300);
    setValue(val);
    onChange(e.target.value);
  };

  return (
    <div className={cn("form-field_wrapper _textarea", wrapperClassName)}>
      {label && <label className="form-field_label">{label}</label>}
      <div style={checkError(errors, name)} className="form-field_inner-wrapper">
        <div className="form-field_textarea__wrapper">
          <Field
            as="textarea"
            value={value}
            name={name}
            placeholder={placeholder}
            className={cn("form-field_field", fieldClassName)}
            onChange={handleChangeValue}
          />
          {charCounter && (
            <div className="form-field_textarea__char-counter">
              <span>
                {value?.length} {maxChar && ` / ${maxChar}`}
              </span>
            </div>
          )}
        </div>
        {errorName && (
          <ErrorMessage name={errorName}>
            {(message) => <p className="form-field_error">{message}</p>}
          </ErrorMessage>
        )}
      </div>
    </div>
  );
};

export default FieldTextarea;
