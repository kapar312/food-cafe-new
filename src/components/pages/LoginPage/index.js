import React from "react";

import LoginForm from "./components/LoginForm";
import {IconLogoBlack} from "../../Icons";

const LoginPage = () => {
  return (
    <div className="auth-page_wrapper">
      <div className="auth-page_inner-wrapper">
        <div className="auth-page_title">
          <div className="auth-page_title__logo">
            <h2>
              <span>
                <IconLogoBlack />
              </span>
              Foodworking
            </h2>
            <p className="auth-page_title__text">Войдите в Вашу учётную запись</p>
          </div>
        </div>
        <div className="auth-page_form__wrapper">
          <h4 className="auth-page_form__title">Вход</h4>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
