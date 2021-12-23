import React from "react";
import {inject, observer} from "mobx-react";

import ModalLayout from "../ModalLayout";
import ButtonPrimary from "../../buttons/ButtonPrimary";

import {EModalSize} from "../consts";

const ModalNotAvailableReserve = inject("store")(
  observer(({isVisible, closeModal}) => {
    const classPrefix = "modal-not-available";

    return (
      <ModalLayout
        isVisible={isVisible}
        closeModal={closeModal}
        classPrefix={classPrefix}
        wrapperClassName={`${classPrefix}_wrapper`}
        closeIcon={true}
        modalSize={EModalSize.md}
        bodyContent={
          <>
            <div className="icon_wrapper">{"💬"}</div>
            <h3>На выбранную дату уже есть брони</h3>
            <p>
              Чтобы закрыть прием и отменить текущие брони свяжитесь с администратом
              Foodworking
            </p>
            <div className="contacts_wrapper">
              <a className="phone" href="tel:+74961200231">
                +7 (495) 120-02-31
              </a>
              <span />
              <a className="mail" href="mailto:">
                service@foodworking.ru
              </a>
            </div>
          </>
        }
        footerContent={
          <ButtonPrimary onClick={closeModal} type="button" buttonColor="primary">
            Понятно
          </ButtonPrimary>
        }
      />
    );
  })
);

export default ModalNotAvailableReserve;
