import React from "react";

import ButtonLink from "../../../../buttons/ButtonLink";
import {CONFIRMATION_PAGE} from "../../../../../consts/routes.const";

import {formatLastDigits} from "../../helpers";

const Placeholder = ({error, lastDigitsOfNumber, errorText}) => {
  return error ? (
    <div className="confirmation-reserves_placeholder__wrapper">
      <p>Ошибка по номеру {formatLastDigits(lastDigitsOfNumber)}</p>
      {errorText && <p>{errorText}</p>}
      <div className="confirmation-reserves_placeholder__actions">
        <ButtonLink hrefTo={CONFIRMATION_PAGE} buttonColor="primary">
          Назад
        </ButtonLink>
      </div>
    </div>
  ) : (
    <div className="confirmation-reserves_placeholder__wrapper">
      <p>Нет совпадений по номеру {formatLastDigits(lastDigitsOfNumber)}</p>
      <div className="confirmation-reserves_placeholder__actions">
        <ButtonLink hrefTo={CONFIRMATION_PAGE} buttonColor="primary">
          Назад
        </ButtonLink>
      </div>
    </div>
  );
};

export default Placeholder;
