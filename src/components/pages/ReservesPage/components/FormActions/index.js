import React from "react";
import {inject, observer} from "mobx-react";
import {toast} from "react-toastify";
import cn from "classnames";

import ButtonPrimary from "../../../../buttons/ButtonPrimary";
import {EButtonColor} from "../../../../buttons/consts";

const FormActions = inject("store")(
  observer(({store: {reserves}}) => {
    const showAllReserves = () => {
      if (reserves.activeReservesTab) {
        toast.success(`все резервы на "${reserves.activeReservesTab}"`);
        reserves.setShowAllReservesActive(true);
      }
    };

    return (
      <div className="reserves-page_form__actions">
        <ButtonPrimary
          buttonColor={EButtonColor.default}
          className={cn({_active: reserves.showAllReservesActive})}
          onClick={showAllReserves}
        >
          Показать все бронирования в этом месяце
        </ButtonPrimary>
      </div>
    );
  })
);

export default FormActions;
