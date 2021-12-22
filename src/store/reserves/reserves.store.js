import {decorate, observable} from "mobx";
import {ReservesAction} from "./reserves.action";

class ReservesStore extends ReservesAction {
  reservesList = {};
  lastDigitsOfNumber = "";
  activeReservesTab = null;
}

// eslint-disable-next-line no-class-assign
ReservesStore = decorate(ReservesAction, {
  reservesList: observable,
  lastDigitsOfNumber: observable,
  activeReservesTab: observable,
});

export default new ReservesStore();
