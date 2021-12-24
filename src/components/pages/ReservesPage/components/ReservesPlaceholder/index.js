import React from "react";
import {inject, observer} from "mobx-react";

import {COLOR_WHITE} from "../../../../../consts/colors.const";
import {IconExclamationPoint} from "../../../../Icons";

const ReservesPlaceholder = inject("store")(
  observer(({store: {reserves}, errorText}) => {
    return (
      <div className="reserves-page_placeholder__wrapper">
        {errorText ? (
          <p>{errorText}</p>
        ) : (
          <>
            <div className="reserves-page_placeholder__icon">
              <span>
                <IconExclamationPoint color={COLOR_WHITE} />
              </span>
            </div>
            <p>Нет резервов на {reserves.selectedCalendarDate}</p>
          </>
        )}
      </div>
    );
  })
);

export default ReservesPlaceholder;
