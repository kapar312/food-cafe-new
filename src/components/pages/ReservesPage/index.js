import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {NavLink} from "react-router-dom";

import Layout from "../../segments/Layout";
import IconArrow from "../../Icons/common/IconArrow";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";

import {MAIN_PAGE} from "../../../consts/routes.const";
import {COLOR_WHITE} from "../../../consts/colors.const";
import {EReservesTabsNames} from "../../../consts/reserves.const";

const ReservesPage = inject("store")(
  observer(({store: {reserves}}) => {
    useEffect(() => {
      reserves.setSelectedCalendarDate(new Date());
      reserves.setVisibleCalendarMonth(new Date().getMonth());
      reserves.setVisibleCalendarYear(`${new Date().getFullYear()}`);
      reserves.setActiveReservesTab(EReservesTabsNames.future);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      reserves.getDatesList();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reserves.visibleCalendarMonth]);

    return (
      <Layout
        headerTitle="Резервы"
        headerMobileContent={
          <>
            <NavLink to={MAIN_PAGE} className="header_btn-back">
              <IconArrow color={COLOR_WHITE} />
            </NavLink>
            Резервы
          </>
        }
      >
        <div className="reserves-page_wrapper">
          <div className="reserves-page_inner-wrapper">
            <LeftSide />
            <RightSide />
          </div>
        </div>
      </Layout>
    );
  })
);

export default ReservesPage;
