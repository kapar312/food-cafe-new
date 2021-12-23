import {decorate, observable} from "mobx";
import {ReservesAction} from "./reserves.action";
import {datesMockups} from "../../mockup/datesMockup";

class ReservesStore extends ReservesAction {
  reservesList = {};
  reservesListByDate = {};
  lastDigitsOfNumber = "";
  activeReservesTab = null;
  selectedCalendarDate = null;
  datesList = datesMockups;
}

// eslint-disable-next-line no-class-assign
ReservesStore = decorate(ReservesAction, {
  reservesList: observable,
  reservesListByDate: observable,
  lastDigitsOfNumber: observable,
  activeReservesTab: observable,
  selectedCalendarDate: observable,
  datesList: observable,
});

export default new ReservesStore();
