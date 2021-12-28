import axiosInstance from "../../api/api";
import {toast} from "react-toastify";
import {forEach} from "lodash";
import {toJS} from "mobx";
import {getStatusesFromTab} from "../../helper/reserves.helper";
import {getNowTime} from "../../helper/time.helper";
import {EReservesDateStatus} from "../../consts/reserves.const";

export class ReservesAction {
  getReservesData(lastDigitsOfNumber) {
    const params = {digits: lastDigitsOfNumber};
    // this.setReservesList(reservesMockup);
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
    url.append("dateFrom", dateFrom ? dateFrom : getNowTime());
    url.append("dateTo", dateTo ? dateTo : dateFrom || getNowTime());
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

  getDateList() {
    const params = {
      dateFrom: "25.12.2021",
      dateTo: "31.12.2021",
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
        // this.datesList[objIndex].isAvailable = action === EReservesDateStatus.close;
        // this.setDatesList(
        //   (this.datesList[objIndex].isAvailable = action === EReservesDateStatus.close)
        // );
      })
      .catch((err) => {
        toast.success(`Не удалось изменить статус на ${date}`);
        throw err;
      });
  }

  setShowAllReservesActive(data) {
    this.showAllReservesActive = data;
  }
}
