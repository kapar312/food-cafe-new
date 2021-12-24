import React, {useState} from "react";
import cn from "classnames";

import {IconCross, IconExclamationPoint} from "../Icons";
import {COLOR_SECONDARY, COLOR_WHITE} from "../../consts/colors.const";

const AlertPlaceholder = ({text, isClosable = true}) => {
  const [isClosed, setIsClosed] = useState(false);

  function closeAlert() {
    setIsClosed(true);
  }

  return (
    <div className={cn("alert_wrapper", isClosed && "closed")}>
      {isClosable && (
        <button type="button" className="alert_close" onClick={closeAlert}>
          <IconCross color={COLOR_SECONDARY} />
        </button>
      )}
      <div className="alert_row">
        <div className="circle-icon circle-icon--warning">
          <IconExclamationPoint color={COLOR_WHITE} />
        </div>
        <p className="alert_text">{text}</p>
      </div>
    </div>
  );
};

export default AlertPlaceholder;
