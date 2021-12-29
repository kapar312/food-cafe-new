import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import cn from "classnames";

import ButtonPrimary from "../../../../buttons/ButtonPrimary";

import {EButtonColor} from "../../../../buttons/consts";
import {
  convertDateToDMYFormat,
  getFirstDayInMonth,
  getLastDayInMonth,
} from "../../../../../helper/time.helper";

const FormActions = inject("store")(
  observer(({store: {reserves}}) => {
    const showAllReserves = () => {
      if (reserves.activeReservesTab) {
        reserves.setShowAllReservesActive(true);
      }
    };

    useEffect(() => {
      console.log("showAllReservesActive", reserves.showAllReservesActive);
      if (reserves.showAllReservesActive) {
        reserves.getReservesDataByDate(
          convertDateToDMYFormat(
            getFirstDayInMonth(
              reserves.visibleCalendarMonth,
              reserves.visibleCalendarYear
            )
          ),
          convertDateToDMYFormat(
            getLastDayInMonth(reserves.visibleCalendarMonth, reserves.visibleCalendarYear)
          )
        );
        reserves.setSelectedCalendarDate(null);
      } else {
        reserves.setIsSelectedDateAvailable(null);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reserves.showAllReservesActive]);

    return (
      <div className="reserves-page_form__actions">
        <ButtonPrimary
          buttonColor={EButtonColor.default}
          className={cn({_active: reserves.showAllReservesActive})}
          onClick={showAllReserves}
          isDisabled={!reserves.activeReservesTab}
        >
          Показать все бронирования в этом месяце
        </ButtonPrimary>
      </div>
    );
  })
);

export default FormActions;
