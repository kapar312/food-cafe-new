import axiosInstance from "../../api/api";

export class ReservesAction {
  getReservesData(lastDigitsOfNumber) {
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
}
