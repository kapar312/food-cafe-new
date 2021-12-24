import {decorate, observable} from "mobx";
import {ReservesAction} from "./reserves.action";

class ReservesStore extends ReservesAction {
  reservesList = {};
  reservesListByDate = {};
  lastDigitsOfNumber = "";
  activeReservesTab = null;
  selectedCalendarDate = null;
  showAllReservesActive = false;
  datesList = [];
}

// eslint-disable-next-line no-class-assign
ReservesStore = decorate(ReservesAction, {
  reservesList: observable,
  reservesListByDate: observable,
  lastDigitsOfNumber: observable,
  activeReservesTab: observable,
  selectedCalendarDate: observable,
  datesList: observable,
  showAllReservesActive: observable,
});

export default new ReservesStore();
