import React, {useEffect, useState} from "react";
import cn from "classnames";
import {debounce, isFunction} from "lodash";
import Autosuggest from "react-autosuggest";
import {inject, observer} from "mobx-react";
import {ErrorMessage} from "formik";

import {mainFieldsNames} from "../pages/Coworking/components/forms/MainForm/formAttrs";

const FieldSuggestAddress = inject("store")(
  observer(
    ({
      store: {common},
      name,
      label,
      errorName,
      wrapperClassName,
      placeholder,
      fieldClassName,
      defaultValue,
      setFieldValue,
    }) => {
      const [autocompleteValue, setAutocompleteValue] = useState("");
      const [suggestions, setSuggestions] = useState([]);

      const getAddressParams = (params) => {
        if (params) {
          common.getAddressData(params);
        }
      };

      const [debouncedCallApi] = useState(() => debounce(getAddressParams, 250));

      const onSearchChange = (event, {newValue}) => {
        setAutocompleteValue(newValue);
      };

      useEffect(() => {
        if (!common.addressList) {
          setSuggestions([]);
        } else {
          setSuggestions(common.addressList);
        }
      }, [common.addressList]);

      const getSuggestionValue = (suggestion) => {
        if (isFunction(setFieldValue)) {
          setFieldValue(name, suggestion.value);
          setFieldValue(mainFieldsNames.latitude, suggestion.address.lat);
          setFieldValue(mainFieldsNames.longitude, suggestion.address.lon);
        }
        return suggestion.value;
      };

      const renderSuggestion = (suggestion) => {
        return <span>{suggestion.value}</span>;
      };

      const onSuggestionsFetchRequested = ({value}) => {
        debouncedCallApi(value);
      };

      const onSuggestionsClearRequested = () => {
        setSuggestions([]);
      };

      const inputProps = {
        placeholder: placeholder || "",
        value: autocompleteValue,
        onChange: onSearchChange,
      };

      const componentTheme = {
        container: "react-autosuggest__container",
        containerOpen: "react-autosuggest__container--open",
        input: "react-autosuggest__input",
        inputOpen: "react-autosuggest__input--open",
        inputFocused: "react-autosuggest__input--focused",
        suggestionsContainer: "react-autosuggest__suggestions-container",
        suggestionsContainerOpen: "react-autosuggest__suggestions-container--open",
        suggestionsList: "react-autosuggest__suggestions-list",
        suggestion: "react-autosuggest__suggestion",
        suggestionFirst: "react-autosuggest__suggestion--first",
        suggestionHighlighted: "react-autosuggest__suggestion--highlighted",
        sectionContainer: "react-autosuggest__section-container",
        sectionContainerFirst: "react-autosuggest__section-container--first",
        sectionTitle: "react-autosuggest__section-title",
      };

      return (
        <div className={cn("form-field_wrapper _suggest-address", wrapperClassName)}>
          {label && <label className="form-field_label">{label}</label>}
          <div className="form-field_inner-wrapper">
            <Autosuggest
              theme={componentTheme}
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
            {errorName && (
              <ErrorMessage name={errorName}>
                {(msg) => <p className="form-field_error">{msg}</p>}
              </ErrorMessage>
            )}
          </div>
        </div>
      );
    }
  )
);

export default FieldSuggestAddress;
