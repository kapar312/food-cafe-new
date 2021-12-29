import React, {useState} from "react";
import {inject, observer} from "mobx-react";
import {NavLink, useHistory} from "react-router-dom";
import {Formik, Form} from "formik";
import {toast} from "react-toastify";

import SearchReservesInput from "./components/SearchReservesInput";
import Layout from "../../segments/Layout";

import {CONFIRMATION_RESERVES_PAGE, MAIN_PAGE} from "../../../consts/routes.const";
import {formSchema, initialValues} from "./formAttrs";
import ButtonPrimary from "../../buttons/ButtonPrimary";
import IconArrow from "../../Icons/common/IconArrow";
import {COLOR_WHITE} from "../../../consts/colors.const";

const ConfirmationPage = inject("store")(
  observer(({store: {reserves}}) => {
    let history = useHistory();
    const [isHasntReserves, setIsHasntReserves] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [isValid, setIsValid] = useState(false);

    const handleChange = (numbers) => {
      setIsHasntReserves(false);
      setErrorText("");
      if (numbers.length === 4) {
        setIsValid(true);
      } else setIsValid(false);
    };

    const onSubmitForm = (values) => {
      reserves.setLastDigitsOfNumber(values.digitsOfNumber);
      reserves
        .getReservesDataByPhone(reserves.lastDigitsOfNumber)
        .then(() => {
          history.push(
            CONFIRMATION_RESERVES_PAGE + `?digits=${reserves.lastDigitsOfNumber}`
          );
        })
        .catch((error) => {
          setIsHasntReserves(true);
          if (error) {
            if (error?.statusText?.length) {
              setErrorText(error.statusText);
            } else if (error.data?.errors?.length) {
              setErrorText(error.data?.errors[0]);
            } else {
              setErrorText("Нет резарва на данный номер");
            }
          } else toast.error("Непредвиденная ошибка. Поробуйте перезагрузить страницу.");
        });
    };

    return (
      <Layout
        headerTitle="Подтвердить бронирование"
        className="confirmation-page_layout"
        headerMobileContent={
          <>
            <NavLink to={MAIN_PAGE} className="header_btn-back">
              <IconArrow color={COLOR_WHITE} />
            </NavLink>
            Подтвердить бронирование
          </>
        }
      >
        <div className="confirmation-page_wrapper">
          <Formik
            initialValues={initialValues}
            validationSchema={formSchema}
            onSubmit={onSubmitForm}
          >
            {({setFieldValue, errors}) => {
              return (
                <Form className="confirmation-page_form__wrapper">
                  <div className="confirmation-page_form__content">
                    <div className="confirmation-page_form__title">
                      <h2>Введите телефон</h2>
                      <p>
                        Для подтверждения брони введите 4 последних цифры телефона гостя,
                        указанного при бронировании
                      </p>
                    </div>
                    <SearchReservesInput
                      name="digitsOfNumber"
                      onChange={handleChange}
                      hasErrored={isHasntReserves}
                      errorText={errors.digitsOfNumber || errorText}
                      setFieldValue={setFieldValue}
                      shouldAutoFocus={true}
                    />
                    <ButtonPrimary
                      type="submit"
                      isDisabled={!isValid}
                      buttonColor="primary"
                    >
                      Далее
                    </ButtonPrimary>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Layout>
    );
  })
);

export default ConfirmationPage;
