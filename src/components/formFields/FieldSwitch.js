import React, {useState} from "react";
import cn from "classnames";
import {ErrorMessage} from "formik";
import {isFunction} from "lodash";
import Switch from "react-switch";

const FieldSwitch = ({
  name,
  label,
  errorName,
  wrapperClassName,
  fieldClassName,
  onChange,
  defaultValue,
}) => {
  const [isActive, setIsActive] = useState(defaultValue || false);
  const onSwitchChange = (nextChecked) => {
    if (isFunction(onChange)) {
      setIsActive(nextChecked);
      onChange(name, nextChecked);
    }
  };

  return (
    <div className={cn("form-field_wrapper _switch", wrapperClassName)}>
      {label && <label className="form-field_label">{label}</label>}
      <div className="form-field_inner-wrapper">
        <Switch
          onChange={onSwitchChange}
          checked={isActive}
          className="form-field_field"
          uncheckedIcon={false}
          checkedIcon={false}
          offColor="#c9ccd3"
          onColor="#8bc531"
          handleDiameter={18}
          height={24}
          width={38}
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

export default FieldSwitch;
