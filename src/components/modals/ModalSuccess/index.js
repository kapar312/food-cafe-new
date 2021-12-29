import React from "react";
import {inject, observer} from "mobx-react";
import {useHistory} from "react-router-dom";

import {CONFIRMATION_PAGE} from "../../../consts/routes.const";
import ModalLayout from "../ModalLayout";
import ButtonPrimary from "../../buttons/ButtonPrimary";

const ModalSuccess = inject("store")(
  observer(({isVisible, closeModal}) => {
    const history = useHistory();
    const classPrefix = "modal-success";

    const onMainBtnClick = () => {
      history.push(CONFIRMATION_PAGE);
    };

    return (
      <ModalLayout
        isVisible={isVisible}
        closeModal={closeModal}
        classPrefix={classPrefix}
        wrapperClassName={`${classPrefix}_wrapper`}
        bodyContent={
          <>
            <div className="icon_wrapper">{"👍"}</div>
            <h3>Бронь активирована</h3>
            <p>Теперь гость может пройти за столик</p>
          </>
        }
        footerContent={
          <>
            <ButtonPrimary onClick={onMainBtnClick} type="button" buttonColor="primary">
              На главную
            </ButtonPrimary>
          </>
        }
      />
    );
  })
);

export default ModalSuccess;
