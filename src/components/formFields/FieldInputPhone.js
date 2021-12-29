import React from "react";
import cn from "classnames";
import {ErrorMessage, Field} from "formik";
import MaskedInput from "react-text-mask";

import {checkError} from "../../helper/form.helper";

const FieldInputPhone = ({
  name,
  label,
  type = "string",
  errorName,
  wrapperClassName,
  fieldClassName,
  errors,
  onChange,
  autoComplete,
  defaultValue,
}) => {
  const phoneNumberMask = [
    "+",
    "7",
    " ",
    "(",
    /\d/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
  ];

  const handlePhoneChange = (e) => {
    const replacedValue = e.target.value.replace(/[^0-9]/g, "");
    onChange(replacedValue);
  };

  return (
    <div className={cn("form-field_wrapper _input", wrapperClassName)}>
      {label && <label className="form-field_label">{label}</label>}
      <div style={checkError(errors, name)} className="form-field_inner-wrapper">
        <Field name={name} type={type}>
          {({field}) => (
            <MaskedInput
              mask={phoneNumberMask}
              id="phone"
              placeholder="+7(___)___-__-__"
              keepCharPositions={true}
              type="text"
              className={cn("form-field_field", fieldClassName)}
              onChange={(e) => handlePhoneChange(e)}
              autoComplete={autoComplete ? "on" : "off"}
              defaultValue={defaultValue || ""}
              {...field}
            />
          )}
        </Field>
        {errorName && (
          <ErrorMessage name={errorName}>
            {(msg) => <p className="form-field_error">{msg}</p>}
          </ErrorMessage>
        )}
      </div>
    </div>
  );
};

export default FieldInputPhone;
