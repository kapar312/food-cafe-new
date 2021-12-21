import React from "react";
import {Provider} from "mobx-react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";

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
import GuestsPageLayout from "../pages/ConfirmationPageLayout";
import GuestsReservesPageLayout from "../pages/GuestsReservesPageLayout";
import LoginPageLayout from "../pages/LoginPageLayout";
import ErrorPageLayout from "../pages/ErrorPageLayout";
import ReservesPageLayout from "../pages/ReservesPageLayout";

export const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path={MAIN_PAGE} component={MainPageLayout} />
            <Route exact path={CONFIRMATION_PAGE} component={GuestsPageLayout} />
            <Route
              exact
              path={CONFIRMATION_RESERVES_PAGE}
              component={GuestsReservesPageLayout}
            />
            <Route path={LOGIN_PAGE} component={LoginPageLayout} />
            <Route exact path={RESERVES_PAGE} component={ReservesPageLayout} />
            <Route path="*" component={ErrorPageLayout} />
          </Switch>
        </Router>
      </Provider>
      <ToastContainer />
    </div>
  );
};
