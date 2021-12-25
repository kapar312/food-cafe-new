import React, {useRef, useEffect} from "react";
import {NavLink} from "react-router-dom";

import logoLink from "../../../common/images/logos/main-logo.svg";
import Logout from "../../common/Logout";
import {IconCheck} from "../../Icons";

import {
  LOGIN_PAGE,
  MAIN_PAGE,
  CONFIRMATION_PAGE,
  RESERVES_PAGE,
} from "../../../consts/routes.const";
import {COLOR_PRIMARY} from "../../../consts/colors.const";
import IconUser from "../../Icons/common/IconUser";
import IconExit from "../../Icons/common/IconExit";

const Sidebar = ({setSidebarWidth}) => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (sidebarRef?.current?.clientWidth) {
      const clientWidth = sidebarRef.current.clientWidth;
      setSidebarWidth(clientWidth);
    }
  });

  return (
    <div className="sidebar_wrapper" ref={sidebarRef}>
      <div className="sidebar_inner-wrapper">
        <div className="sidebar_logo__wrapper">
          <NavLink to={MAIN_PAGE} className="sidebar_logo__item">
            <img src={logoLink} alt="FoodWorking logo" />
          </NavLink>
        </div>
        <div className="sidebar_list__wrapper">
          <NavLink to={CONFIRMATION_PAGE} className="sidebar_list__item">
            <IconUser color={COLOR_PRIMARY} /> Подтвердить бронирование
          </NavLink>
          <NavLink to={RESERVES_PAGE} className="sidebar_list__item">
            <IconCheck color={COLOR_PRIMARY} /> Резервы
          </NavLink>
        </div>
        <div className="sidebar_exit__wrapper">
          <Logout
            component={
              <NavLink to={LOGIN_PAGE} className="sidebar_exit__item">
                <IconExit /> Выйти
              </NavLink>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
