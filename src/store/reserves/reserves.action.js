import axiosInstance from "../../api/api";
import {toast} from "react-toastify";
import {toJS} from "mobx";
import {getStatusesFromTab} from "../../helper/reserves.helper";
import {EReservesDateStatus} from "../../consts/reserves.const";
import moment from "moment";
import {
  convertDateToDMYFormat,
  getFirstDayInMonth,
  getLastDayInMonth,
} from "../../helper/time.helper";

export class ReservesAction {
  getReservesDataByPhone(lastDigitsOfNumber) {
    const params = {digits: lastDigitsOfNumber};
    return axiosInstance
      .get("hostess/reservations/by-phone-number", {params})
      .then(({data}) => {
        this.setReservesList(data);
      })
      .catch((err) => {
        throw err;
      });
  }

  reserveById(reservationId) {
    return axiosInstance
      .post(`hostess/reservations/${reservationId}/checkin`)
      .then(() => {
        this.reservesList = this.reservesList.filter((item) => item.id !== reservationId);
      })
      .catch((err) => {
        throw err;
      });
  }

  setReservesList(data) {
    this.reservesList = data;
  }

  setLastDigitsOfNumber(data) {
    this.lastDigitsOfNumber = data;
  }

  setActiveReservesTab(value) {
    this.activeReservesTab = value;
  }

  getReservesDataByDate(dateFrom, dateTo) {
    let url = new URLSearchParams();
    const statuses = getStatusesFromTab(this.activeReservesTab);
    url.append("dateFrom", dateFrom ? dateFrom : moment().format("DD.MM.yyyy"));
    url.append("dateTo", dateTo ? dateTo : dateFrom || moment().format("DD.MM.yyyy"));
    statuses.forEach((item) => {
      url.append("statuses", item);
    });
    return axiosInstance
      .get(`hostess/reservations/by-date-range?${url}`)
      .then(({data}) => {
        this.setReservesListByDate(data.reservations);
      })
      .catch((err) => {
        throw err;
      });
  }

  setReservesListByDate(data) {
    this.reservesListByDate = data;
  }

  setSelectedCalendarDate(data) {
    this.selectedCalendarDate = data;
  }

  setVisibleCalendarMonth(data) {
    this.visibleCalendarMonth = data;
  }

  setVisibleCalendarYear(data) {
    this.visibleCalendarYear = data;
  }

  getDatesList(dateFrom, dateTo) {
    const params = {
      dateFrom:
        dateFrom ||
        convertDateToDMYFormat(
          getFirstDayInMonth(this.visibleCalendarMonth, this.visibleCalendarYear)
        ),
      dateTo:
        dateTo ||
        convertDateToDMYFormat(
          getLastDayInMonth(this.visibleCalendarMonth, this.visibleCalendarYear)
        ),
    };
    return axiosInstance
      .get("hostess/reservations-calendar/by-date-range", {params})
      .then(({data}) => {
        this.setDatesList(data.dates);
      })
      .catch((err) => {
        throw err;
      });
  }

  setDatesList(data) {
    this.datesList = data;
  }

  handleReservationDate(date, action) {
    return axiosInstance
      .post(
        `/hostess/reservation-dates/${date}`,
        {},
        {
          params: {action: action},
        }
      )
      .then(({data}) => {
        toast.success(
          `Приём гостей на ${date} число ${
            action === EReservesDateStatus.close ? "ЗАКРЫТ" : "ОТКРЫТ"
          }`
        );
        const newArray = this.datesList.map((item) => {
          if (item.date === date) {
            return {...item, isAvailable: action !== EReservesDateStatus.close};
          }
          return toJS(item);
        });
        this.setDatesList(newArray);
      })
      .catch((err) => {
        toast.success(`Не удалось изменить статус на ${date}`);
        throw err;
      });
  }

  setShowAllReservesActive(data) {
    this.showAllReservesActive = data;
  }

  setIsSelectedDateAvailable(data) {
    this.isSelectedDateAvailable = data;
  }
}
