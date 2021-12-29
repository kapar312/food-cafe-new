import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";

import {IconLogoBlack} from "../../Icons";
import LoginForm from "./components/LoginForm";

import {getStorage} from "../../../services/storage.service";
import {ACCESS_TOKEN, ACCESS_TOKEN_EXPIRES} from "../../../consts/auth.const";
import {MAIN_PAGE} from "../../../consts/routes.const";
import {toast} from "react-toastify";

const LoginPage = () => {
  let history = useHistory();
  const accessToken = getStorage(ACCESS_TOKEN);
  const accessTokenExpiresAtUtc = getStorage(ACCESS_TOKEN_EXPIRES);

  useEffect(() => {
    if (accessToken && accessTokenExpiresAtUtc) {
      history.push(MAIN_PAGE);
      toast.warning("Вы уже авторизованы.");
    }
  }, [accessToken, accessTokenExpiresAtUtc, history]);

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
