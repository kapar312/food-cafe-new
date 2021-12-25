import React from "react";
import {inject, observer} from "mobx-react";
import {useMediaQuery} from "react-responsive";
import {NavLink} from "react-router-dom";

import Layout from "../../segments/Layout";
import {IconCheck, IconUser} from "../../Icons";
import FullLogo from "../../Icons/logos/FullLogo";

import {mediaBreakpoints} from "../../../consts/mediaBreakpoints";
import {CONFIRMATION_PAGE, RESERVES_PAGE} from "../../../consts/routes.const";
import {COLOR_PRIMARY} from "../../../consts/colors.const";

const MainPage = inject("store")(
  observer(({store: {file}}) => {
    const isTablet = useMediaQuery({
      minWidth: mediaBreakpoints.xsMedia,
      maxWidth: mediaBreakpoints.mdMediaZ,
    });

    return (
      <Layout
        headerTitle="Главная страница"
        headerMobileClassName="main-page"
        headerMobileContent={
          <>
            <FullLogo />
          </>
        }
      >
        <div className="main-page_wrapper">
          <div className="main-page_inner-wrapper">
            <h1>Добро пожаловать в FoodWorking</h1>

            {isTablet && (
              <div className="main-page_links__wrapper">
                <div className="main-page_links__inner-wrapper">
                  <NavLink to={CONFIRMATION_PAGE} className="main-page_links__item">
                    <span>
                      <IconUser color={COLOR_PRIMARY} />
                    </span>
                    Подтвердить бронирование
                  </NavLink>
                  <NavLink to={RESERVES_PAGE} className="main-page_links__item">
                    <span>
                      <IconCheck color={COLOR_PRIMARY} />
                    </span>
                    Резервы
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
  })
);

export default MainPage;
