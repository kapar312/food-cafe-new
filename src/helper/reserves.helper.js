import {EReservationStatus, EReservesTabsNames} from "../consts/reserves.const";

export const getStatusesFromTab = (activeTab) => {
  if (activeTab === EReservesTabsNames.future) {
    return [EReservationStatus.waitingForCheckIn];
  } else if (activeTab === EReservesTabsNames.confirmed) {
    return [EReservationStatus.inProgress];
  } else if (activeTab === EReservesTabsNames.history) {
    return [
      EReservationStatus.done,
      EReservationStatus.canceled,
      EReservationStatus.wasted,
    ];
  } else return null;
};
