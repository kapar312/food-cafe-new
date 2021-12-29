import {AuthAction} from "./auth.action";
import {decorate, observable} from "mobx";

class AuthStore extends AuthAction {
  userData = {};
}

// eslint-disable-next-line no-class-assign
AuthStore = decorate(AuthStore, {
  userData: observable,
});

export default new AuthStore();
