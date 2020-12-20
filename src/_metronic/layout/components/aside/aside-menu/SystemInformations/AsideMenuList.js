/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import {useLocation} from "react-router";
import {NavLink}  from "react-router-dom";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl, checkIsActive} from "../../../../../_helpers";
// import { useIntl } from "react-intl";

export function AsideMenuList({ layoutProps }) {

  // const intl = useIntl()
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
        ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
        : "";
  };

  return (
      <>
        {/* begin::Menu Nav */}
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
          {/*begin::1 Level*/}
          <li
              className={`menu-item ${getMenuItemActive("/system-informations", false)}`}
              aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/system-informations">
            <span className="svg-icon menu-icon">
              <SVG title = "Sisteme İlişkin Bilgiler" src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}/>
            </span>
          <span className="menu-text">Sisteme İlişkin Bilgiler</span>
            </NavLink>
          </li>
          {/*end::1 Level*/}
      

        </ul>

        {/* end::Menu Nav */}
      </>
  );
}
