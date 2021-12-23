import AuthStore from "./auth/auth.store";
import ReservesStore from "./reserves/reserves.store";

class RootStore {
  constructor() {
    this.auth = AuthStore;
    this.reserves = ReservesStore;
  }
}

export default new RootStore();
