import React from "react";
import cn from "classnames";
import {ErrorMessage} from "formik";
import Select from "react-select";

import {checkError} from "../../helper/form.helper";

const FieldSelect = ({
  name,
  placeholder,
  options,
  label,
  errorName,
  wrapperClassName,
  fieldClassName,
  errors,
  onChange,
  disabled,
  defaultValue,
  menuIsOpen,
  styles,
  formatOptionLabel,
}) => {
  return (
    <div
      className={cn("form-field_wrapper _select", wrapperClassName, {
        _disabled: disabled,
      })}
    >
      {label && <label className="form-field_label">{label}</label>}
      <div style={checkError(errors, name)} className="form-field_inner-wrapper">
        <Select
          options={options}
          className={cn("form-field_field", fieldClassName)}
          classNamePrefix={"custom-select"}
          placeholder={placeholder}
          onChange={(e) => onChange(e?.value)}
          isDisabled={disabled}
          defaultValue={defaultValue}
          menuIsOpen={menuIsOpen}
          styles={styles}
          formatOptionLabel={formatOptionLabel}
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

export default FieldSelect;
