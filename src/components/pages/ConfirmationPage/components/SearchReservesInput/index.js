import React, {useState} from "react";
import {inject, observer} from "mobx-react";
import cn from "classnames";
import OtpInput from "react-otp-input";
import {isFunction} from "lodash";
import {IconCross} from "../../../../Icons";

const SearchReservesInput = inject("store")(
  observer(({onChange, hasErrored, errorText, setFieldValue, name, shouldAutoFocus}) => {
    const [state, setState] = useState("");
    let isErrored = hasErrored;

    const handleChange = (otp) => {
      onChange(otp);
      setState(otp);
      if (isFunction(setFieldValue)) {
        setFieldValue(name, otp);
      }
    };

    const clearFields = () => {
      setState("");
      onChange("");
      if (isFunction(setFieldValue)) {
        setFieldValue(name, "");
      }
    };

    return (
      <div className="segmented-input-wrapper">
        <OtpInput
          value={state}
          onChange={handleChange}
          numInputs={4}
          containerStyle="segmented-input"
          separator={false}
          hasErrored={isErrored}
          errorStyle="error"
          isInputNum={true}
          shouldAutoFocus={shouldAutoFocus}
        />
        {errorText && (
          <p className={cn("segmented-input_error-text", isErrored ? "show" : "")}>
            {errorText}
          </p>
        )}
        {!!state?.length && (
          <button className="segmented-input_clear" type="button" onClick={clearFields}>
            <IconCross />
          </button>
        )}
      </div>
    );
  })
);

export default SearchReservesInput;
