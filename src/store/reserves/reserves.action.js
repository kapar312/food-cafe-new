import axiosInstance from "../../api/api";
import {toast} from "react-toastify";

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

  getReservesDataByDate() {
    const params = {
      dateFrom: "25.12.2021",
      dateTo: "30.12.2021",
    };
    // this.setReservesList(reservesMockup);
    return axiosInstance
      .get("/reserve/by-date-range", {params})
      .then(({data}) => {
        this.setReservesList(data);
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

  setDatesList(data) {
    this.datesList = data;
  }

  handleReservationDate(date, action) {
    // value = "Open" || "Close"
    return axiosInstance
      .post(`/hostess/reservation-dates/${date}`, {action})
      .then(({data}) => {
        toast.success(`На ${date} установлен статус "${action}"`);
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
