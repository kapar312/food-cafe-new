import React from "react";
import {inject, observer} from "mobx-react";
import {useHistory} from "react-router-dom";

import {clearStorage} from "../../services/storage.service";
import {LOGIN_PAGE} from "../../consts/routes.const";

const Logout = inject("store")(
  observer(({store: {auth}, component}) => {
    let history = useHistory();

    const onClick = () => {
      clearStorage();
      auth.setUserData(null);
      history.push(LOGIN_PAGE);
    };

    return React.cloneElement(component, {onClick});
  })
);

export default Logout;
