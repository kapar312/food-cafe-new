import React, {useRef, useState} from "react";
import cn from "classnames";
import {ErrorMessage, Field} from "formik";
import isFunction from "lodash/isFunction";

const FieldInputLabel = ({
  name,
  placeholder,
  subPlaceholder,
  label,
  type,
  errorName,
  wrapperClassName,
  fieldClassName,
  autoComplete,
  defaultValue,
  onChange,
}) => {
  const fieldRef = useRef(null);
  const [fieldValue, setFieldValue] = useState("");

  const handleFieldChange = (e) => {
    if (isFunction(onChange)) {
      setFieldValue(e.target.value);
      onChange(e.target.value);
    }
  };

  const focusOnFiled = () => {
    if (fieldRef.current) {
      fieldRef.current.focus();
    }
  };

  return (
    <div className={cn("form-field_wrapper _input _label", wrapperClassName)}>
      {label && <label className="form-field_label">{label}</label>}
      <div
        className={cn("form-field_inner-wrapper", {
          _activeField: fieldValue?.length,
        })}
      >
        {subPlaceholder && (
          <label
            onClick={focusOnFiled}
            className={cn("form-field_sub-placeholder", {
              _activeField: fieldValue?.length,
            })}
          >
            {subPlaceholder}
          </label>
        )}
        <Field
          innerRef={fieldRef}
          name={name}
          placeholder={subPlaceholder ? "" : placeholder}
          className={cn("form-field_field", fieldClassName)}
          type={type || "text"}
          autoComplete={autoComplete ? "on" : "off"}
          onChange={onChange && handleFieldChange}
          // defaultValue={fieldValue || defaultValue || ""}
          // value={fieldValue}
        />
        {errorName && (
          <ErrorMessage name={errorName}>
            {(msg) => (
              <p className="form-field_error" onClick={focusOnFiled}>
                {msg}
              </p>
            )}
          </ErrorMessage>
        )}
      </div>
    </div>
  );
};

export default FieldInputLabel;
