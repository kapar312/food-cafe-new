import React from "react";

import {IconLock} from "../../../../Icons";

const CalendarInfo = () => {
  return (
    <div className="reserves-page_calendar-info__wrapper">
      <div className="reserves-page_calendar-info__item">
        <i />
        <span>Есть резервы на этот день</span>
      </div>
      <div className="reserves-page_calendar-info__item">
        <IconLock width={10} height={10} />
        <span>Резервы не принимаются</span>
      </div>
    </div>
  );
};

export default CalendarInfo;
