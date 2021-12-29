import React, {useEffect} from "react";

import Layout from "../../segments/Layout";

import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import {NavLink} from "react-router-dom";
import {MAIN_PAGE} from "../../../consts/routes.const";
import IconArrow from "../../Icons/common/IconArrow";
import {COLOR_WHITE} from "../../../consts/colors.const";
import {inject, observer} from "mobx-react";
import {
  convertDateToDMYFormat,
  getFirstDayInMonth,
  getLastDayInMonth,
} from "../../../helper/time.helper";

const ReservesPage = inject("store")(
  observer(({store: {reserves}}) => {
    const getAllReservesOnMonth = () => {
      reserves.getReservesDataByDate(
        convertDateToDMYFormat(
          getFirstDayInMonth(reserves.visibleCalendarMonth, reserves.visibleCalendarYear)
        ),
        convertDateToDMYFormat(
          getLastDayInMonth(reserves.visibleCalendarMonth, reserves.visibleCalendarYear)
        )
      );
      reserves.setSelectedCalendarDate(null);
    };

    useEffect(() => {
      reserves.setSelectedCalendarDate(new Date());
      reserves.setVisibleCalendarMonth(new Date().getMonth());
      reserves.setVisibleCalendarYear(`${new Date().getFullYear()}`);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      reserves.getDatesList();
      if (reserves.showAllReservesActive) {
        getAllReservesOnMonth();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reserves.visibleCalendarMonth]);

    useEffect(() => {
      if (reserves.showAllReservesActive) {
        getAllReservesOnMonth();
      } else if (reserves.selectedCalendarDate) {
        reserves.getReservesDataByDate(
          convertDateToDMYFormat(reserves.selectedCalendarDate)
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reserves.activeReservesTab]);

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
