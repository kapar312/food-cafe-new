import axiosInstance from "../../api/api";
import {reservesMockup} from "../../mockup/reservesMockup";

export class ReservesAction {
  getReservesData(lastDigitsOfNumber) {
    const params = {digits: lastDigitsOfNumber};
    this.setReservesList(reservesMockup);
    return axiosInstance
      .get("hostess/reservations/by-phone-number", {params})
      .then(({data}) => {
        // this.setReservesList(data);
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
      dateFrom: "11.12.2011",
      dateTo: "30.12.2011",
    };
    this.setReservesList(reservesMockup);
    return axiosInstance
      .get("hostess/reserve/by-date-range", {params})
      .then(({data}) => {
        // this.setReservesList(data);
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
}
