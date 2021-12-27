import React from "react";
import {Route, Redirect} from "react-router-dom";
// local
import {getStorage} from "../services/storage.service";
import {LOGIN_PAGE} from "../consts/routes.const";
import {ACCESS_TOKEN} from "../consts/auth.const";

export const PrivateRouter = ({component: Component}) => {
  const accessToken = getStorage(ACCESS_TOKEN);
  return <Route>{!accessToken ? <Redirect to={LOGIN_PAGE} /> : <Component />}</Route>;
};
