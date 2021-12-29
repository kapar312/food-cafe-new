import React from "react";
import {Formik, Form} from "formik";
import {inject, observer} from "mobx-react";
import {useHistory} from "react-router-dom";
import {isEmpty} from "lodash";

import FieldInputLabel from "../../../../formFields/FieldInputLabel";
import FieldPassword from "../../../../formFields/FieldPassword";
import ButtonPrimary from "../../../../buttons/ButtonPrimary";

import {loginFormFieldsNames, loginFormSchema, loginFormInitialValues} from "./formAttrs";
import {MAIN_PAGE} from "../../../../../consts/routes.const";
import {EButtonColor} from "../../../../buttons/consts";

const LoginForm = inject("store")(
  observer(({store: {auth}}) => {
    let history = useHistory();

    const onSubmitForm = (values) => {
      auth.login(values).then(() => {
        history.push(MAIN_PAGE);
      });
      history.push(MAIN_PAGE);
    };

    return (
      <Formik
        initialValues={loginFormInitialValues}
        validationSchema={loginFormSchema}
        onSubmit={onSubmitForm}
      >
        {(props) => {
          const {errors, values, setFieldValue, touched} = props;
          const renderErrors = () => {
            const result = [];
            for (const key in touched) {
              if (touched.hasOwnProperty(key)) {
                result.push(errors[key]);
              }
            }
            return result;
          };
          return (
            <div className="auth-page_form__inner-wrapper">
              <Form className="auth-page_form__form">
                <FieldInputLabel
                  type="email"
                  name={loginFormFieldsNames.email}
                  // errorName={loginFormFieldsNames.email}
                  onChange={(val) => setFieldValue(loginFormFieldsNames.email, val)}
                  subPlaceholder="E-mail"
                  wrapperClassName="auth-page_form__field"
                />
                <FieldPassword
                  name={loginFormFieldsNames.password}
                  // errorName={loginFormFieldsNames.password}
                  onChange={(val) => setFieldValue(loginFormFieldsNames.password, val)}
                  subPlaceholder="Пароль"
                  wrapperClassName="auth-page_form__field"
                />
                {!isEmpty(errors) && (
                  <div className="auth-page_form__errors">
                    {renderErrors().map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                )}
                <ButtonPrimary
                  type="submit"
                  className="auth-page_form__btn"
                  buttonColor={EButtonColor.primary}
                  // isDisabled={!isEmpty(errors)}
                  isDisabled={
                    Object.values(values).every((x) => x === null || x === "") ||
                    !isEmpty(errors)
                  }
                >
                  Войти
                </ButtonPrimary>
              </Form>
            </div>
          );
        }}
      </Formik>
    );
  })
);

export default LoginForm;
