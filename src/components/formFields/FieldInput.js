import React from "react";
import cn from "classnames";
import {ErrorMessage, Field} from "formik";

const FieldInput = ({
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
  return (
    <div className={cn("form-field_wrapper _input", wrapperClassName)}>
      {label && <label className="form-field_label">{label}</label>}
      <div className="form-field_inner-wrapper">
        <Field
          name={name}
          placeholder={placeholder}
          className={cn("form-field_field", fieldClassName)}
          type={type}
          autoComplete={autoComplete ? "on" : "off"}
          defaultValue={defaultValue || ""}
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

export default FieldInput;
