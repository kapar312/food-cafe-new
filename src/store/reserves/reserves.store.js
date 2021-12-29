import {decorate, observable} from "mobx";
import {ReservesAction} from "./reserves.action";

class ReservesStore extends ReservesAction {
  reservesListByPhone = {};
  reservesListByDate = {};
  lastDigitsOfNumber = "";
  activeReservesTab = null;
  selectedCalendarDate = null;
  isSelectedDateAvailable = null;
  visibleCalendarMonth = null;
  visibleCalendarYear = null;
  showAllReservesActive = false;
  datesList = [];
}

// eslint-disable-next-line no-class-assign
ReservesStore = decorate(ReservesAction, {
  reservesListByPhone: observable,
  reservesListByDate: observable,
  lastDigitsOfNumber: observable,
  activeReservesTab: observable,
  selectedCalendarDate: observable,
  isSelectedDateAvailable: observable,
  visibleCalendarMonth: observable,
  visibleCalendarYear: observable,
  datesList: observable,
  showAllReservesActive: observable,
});

export default new ReservesStore();
