import axiosInstance from "../../api/api";
import {ACCESS_TOKEN, ACCESS_TOKEN_EXPIRES, LOGIN} from "../../consts/auth.const";
import {setStorage} from "../../services/storage.service";
import {toast} from "react-toastify";

export class AuthAction {
  login(data) {
    return axiosInstance
      .post(LOGIN, data)
      .then(({data}) => {
        setStorage(ACCESS_TOKEN, data.accessToken);
        setStorage(ACCESS_TOKEN_EXPIRES, data.accessTokenExpiresAtUtc);
        this.setUserData(data.user);
      })
      .catch((error) => {
        if (error?.statusText) {
          alert(error.statusText);
        }
        if (error?.data?.errors) {
          error.data.errors.map((item) => toast.error(item));
        }
        throw error;
      });
  }

  setUserData(data) {
    this.userData = data;
  }
}
