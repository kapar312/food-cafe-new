import React, {useRef, useState} from "react";
import cn from "classnames";
import {ErrorMessage, Field} from "formik";
import isFunction from "lodash/isFunction";

import {IconEye} from "../Icons";
import {COLOR_PRIMARY} from "../../consts/colors.const";

const FieldPassword = ({
  name,
  placeholder,
  subPlaceholder,
  label,
  errorName,
  wrapperClassName,
  fieldClassName,
  autoComplete,
  defaultValue,
  onChange,
}) => {
  const fieldRef = useRef(null);
  const [fieldValue, setFieldValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);

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

  const handlePasswordVisible = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div
      className={cn("form-field_wrapper _password", wrapperClassName, {
        _label: subPlaceholder,
      })}
    >
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
          type={isVisible ? "text" : "password"}
          autoComplete={autoComplete ? "on" : "off"}
          onChange={onChange && handleFieldChange}
        />
        <button
          type="button"
          className="form-field_btn-password"
          onClick={handlePasswordVisible}
          style={{opacity: isVisible ? 1 : 0.5}}
        >
          <IconEye color={COLOR_PRIMARY} />
        </button>
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

export default FieldPassword;
