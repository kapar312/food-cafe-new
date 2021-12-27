import React, {useEffect} from "react";
import {Provider} from "mobx-react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

import "rc-time-picker/assets/index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";
import "react-datepicker/dist/react-datepicker.css";
// local
import store from "../store";
import {
  MAIN_PAGE,
  LOGIN_PAGE,
  CONFIRMATION_RESERVES_PAGE,
  CONFIRMATION_PAGE,
  RESERVES_PAGE,
} from "../consts/routes.const";

import MainPageLayout from "../pages/MainPageLayout";
import ConfirmationReservesPageLayout from "../pages/ConfirmationPageLayout";
import GuestsReservesPageLayout from "../pages/ConfirmationReservesPageLayout";
import LoginPageLayout from "../pages/LoginPageLayout";
import ErrorPageLayout from "../pages/ErrorPageLayout";
import ReservesPageLayout from "../pages/ReservesPageLayout";

import {clearStorage, getStorage} from "../services/storage.service";
import {ACCESS_TOKEN, ACCESS_TOKEN_EXPIRES} from "../consts/auth.const";
import {getTokenExpires} from "../helper/time.helper";
import {PrivateRouter} from "./index";

export const App = () => {
  let history = useHistory();
  const accessToken = getStorage(ACCESS_TOKEN);
  const accessTokenExpiresAtUtc = getStorage(ACCESS_TOKEN_EXPIRES);
  const nowTime = new Date().toISOString();

  useEffect(() => {
    if (nowTime > getTokenExpires(ACCESS_TOKEN_EXPIRES, true)) {
      clearStorage();
      toast.warning("Переавторизуйтесь. Ваша сессия истекта.");
      history.push(LOGIN_PAGE);
    }
    if (!accessToken || !accessTokenExpiresAtUtc) {
      clearStorage();
      history.push(LOGIN_PAGE);
    }
  }, [accessToken, nowTime, accessTokenExpiresAtUtc, history]);

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <PrivateRouter exact path={MAIN_PAGE} component={MainPageLayout} />
            <PrivateRouter
              exact
              path={CONFIRMATION_PAGE}
              component={ConfirmationReservesPageLayout}
            />
            <PrivateRouter
              exact
              path={CONFIRMATION_RESERVES_PAGE}
              component={GuestsReservesPageLayout}
            />
            <Route path={LOGIN_PAGE} component={LoginPageLayout} />
            <PrivateRouter exact path={RESERVES_PAGE} component={ReservesPageLayout} />
            <Route path="*" component={ErrorPageLayout} />
          </Switch>
        </Router>
      </Provider>
      <ToastContainer />
    </div>
  );
};
