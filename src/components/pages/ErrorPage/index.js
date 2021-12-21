import React from "react";
import cn from "classnames";

import ButtonLink from "../../buttons/ButtonLink";

import {MAIN_PAGE} from "../../../consts/routes.const";
import {EButtonColor} from "../../buttons/consts";

const ErrorPage = ({title, subTitle, text, linkHref, linkText, classPrefix}) => {
  return (
    <div className={cn("error-page_wrapper", `_${classPrefix}`)}>
      <div className="error-page_inner-wrapper">
        <div className="error-page_image__wrapper" />
        <div className="error-page_content__wrapper">
          <div className="error-page_content__inner-wrapper">
            <h2
              className={cn("error-page_content__title", {
                _noTitle: !title,
              })}
            >
              {title || "Страница ошибки"}
            </h2>
            {subTitle && <h3 className="error-page_content__sub-title">{subTitle}</h3>}
            <p className="error-page_content__text">
              {text || "Что-то пошло не так или страница не найдена"}
            </p>
            <div className="error-page_content__actions">
              <ButtonLink
                hrefTo={linkHref || MAIN_PAGE}
                buttonColor={EButtonColor.secondary}
              >
                {linkText || "На главную"}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
