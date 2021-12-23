import React, {useEffect} from "react";
import {createPortal} from "react-dom";
import cn from "classnames";

import disableBodyScroll from "../../../helper/disableScrollBody";
import {IconCross} from "../../Icons";
import {COLOR_WHITE} from "../../../consts/colors.const";
import {EModalSize} from "../consts";

const ModalLayout = ({
  headContent,
  bodyContent,
  footerContent,
  wrapperClassName,
  classPrefix,
  isVisible,
  closeModal,
  closeIcon = false,
  modalSize = EModalSize.bs,
}) => {
  useEffect(() => {
    disableBodyScroll(isVisible);
    return () => disableBodyScroll(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, document]);

  const component = (
    <div className={cn("modal_wrapper", wrapperClassName, {visible: isVisible})}>
      <div className="modal_mask_wrapper" />
      <div className="modal_inner-wrapper">
        <div
          className={cn("modal_content", `${classPrefix}_content`, `_size-${modalSize}`)}
        >
          {closeIcon && (
            <button onClick={closeModal} className="modal_close">
              <IconCross color={COLOR_WHITE} />
            </button>
          )}
          {headContent && (
            <div className={cn("modal_head", `${classPrefix}_head`)}>{headContent}</div>
          )}
          {bodyContent && (
            <div className={cn("modal_body", `${classPrefix}_body`)}>{bodyContent}</div>
          )}
          {footerContent && (
            <div className={cn("modal_footer", `${classPrefix}_footer`)}>
              {footerContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return document && document.body ? createPortal(component, document.body) : component;
};

export default ModalLayout;
