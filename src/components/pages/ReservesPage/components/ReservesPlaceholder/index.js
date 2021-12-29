import React from "react";
import {inject, observer} from "mobx-react";

import {COLOR_WHITE} from "../../../../../consts/colors.const";
import {IconExclamationPoint} from "../../../../Icons";
import {
  convertDateToDMYFormat,
  getFirstDayInMonth,
  getLastDayInMonth,
} from "../../../../../helper/time.helper";

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
            {reserves.showAllReservesActive ? (
              <p>
                Нет резервов c{" "}
                {convertDateToDMYFormat(
                  getFirstDayInMonth(
                    reserves.visibleCalendarMonth,
                    reserves.visibleCalendarYear
                  )
                )}{" "}
                по{" "}
                {convertDateToDMYFormat(
                  getLastDayInMonth(
                    reserves.visibleCalendarMonth,
                    reserves.visibleCalendarYear
                  )
                )}
              </p>
            ) : (
              <p>
                Нет резервов на {convertDateToDMYFormat(reserves.selectedCalendarDate)}
              </p>
            )}
          </>
        )}
      </div>
    );
  })
);

export default ReservesPlaceholder;
