import React from "react";
import {inject, observer} from "mobx-react";
import {useHistory} from "react-router-dom";

import ModalLayout from "../ModalLayout";
import ButtonPrimary from "../../buttons/ButtonPrimary";

import {CONFIRMATION_PAGE} from "../../../consts/routes.const";

const ModalError = inject("store")(
  observer(({isVisible, closeModal}) => {
    const history = useHistory();
    const classPrefix = "modal-error";

    const onMainBtnClick = () => {
      history.push(CONFIRMATION_PAGE);
    };

    const refreshPage = () => {
      if (window) {
        window.location.reload();
      }
    };

    return (
      <ModalLayout
        isVisible={isVisible}
        closeModal={closeModal}
        classPrefix={classPrefix}
        wrapperClassName={`${classPrefix}_wrapper`}
        bodyContent={
          <>
            <div className="icon_wrapper">{"🤷"}</div>
            <h3>Что-то пошло не так!</h3>
            <p>Попробуйте перезагрузить страницу и повторить снова.</p>
            <p>
              Если не получится подтвердить бронь после перезагрузки страницы, то
              обратитесь в службу поддержки{" "}
              <a href="tel:+74961200231">+7 (495) 120-02-31</a>
            </p>
          </>
        }
        footerContent={
          <>
            <ButtonPrimary onClick={refreshPage} type="button" buttonColor="primary">
              Перезагрузить страницу
            </ButtonPrimary>
            <ButtonPrimary onClick={onMainBtnClick} type="button" buttonColor="default">
              На главную
            </ButtonPrimary>
          </>
        }
      />
    );
  })
);

export default ModalError;
