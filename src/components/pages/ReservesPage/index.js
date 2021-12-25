import React from "react";

import Layout from "../../segments/Layout";

import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import {NavLink} from "react-router-dom";
import {MAIN_PAGE} from "../../../consts/routes.const";
import IconArrow from "../../Icons/common/IconArrow";
import {COLOR_WHITE} from "../../../consts/colors.const";

const ReservesPage = () => {
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
};

export default ReservesPage;
