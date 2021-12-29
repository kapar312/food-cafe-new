export const EReservesTabsNames = {
  future: "Future",
  confirmed: "Confirmed",
  history: "History",
};

export const reservesTabs = [
  {
    id: 1,
    label: "Будущие",
    value: EReservesTabsNames.future,
  },
  {
    id: 2,
    label: "Подтвержденные",
    value: EReservesTabsNames.confirmed,
  },
  {
    id: 3,
    label: "История",
    value: EReservesTabsNames.history,
  },
];

export const EReservesDateStatus = {
  open: "Open",
  close: "Close",
};

export const EReservationStatus = {
  payment: "Payment", // пользователь сделал запрос на создание резерва
  paymentFailed: "PaymentFailed", // в отведенные 10 минут пользователь не произвел успешную оплату / пользователь отменил оплату
  waitingForCheckIn: "WaitingForCheckIn", // статус проставляется, когда пользователь успешно оплатил заказ // "Будущие"
  inProgress: "InProgress", // Произошло событие CheckIn // "Подтвержденные"
  done: "Done", // ставится, когда пользователь сделал CheckOut, либо кончился день, в который была бронь // "История"
  canceled: "Canceled", // ставится, когда произошло событие отмены резерва // "История"
  wasted: "Wasted", // ставится, когда бронь уже началась, но не был сделан CheckIn // "История"
};
