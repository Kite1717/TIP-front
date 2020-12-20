/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import {useLocation} from "react-router";
import {NavLink}  from "react-router-dom";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl, checkIsActive} from "../../../../../_helpers";
import { useIntl } from "react-intl";

export function AsideMenuList({ layoutProps }) {

  const intl = useIntl()
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
              className={`menu-item ${getMenuItemActive("/data-entries/mir", false)}`}
              aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/data-entries/mir">
            <span className="svg-icon menu-icon">
              <SVG  title = {intl.formatMessage({ id: "MENU.DATAENTRIES.MONTHINDRES" })}  src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}/>
            </span>
          <span className="menu-text">{intl.formatMessage({ id: "MENU.DATAENTRIES.MONTHINDRES" })}</span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

             {/*begin::1 Level*/}
             <li
              className={`menu-item ${getMenuItemActive("/data-entries/ir", false)}`}
              aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/data-entries/ir">
            <span className="svg-icon menu-icon">
              <SVG title = {intl.formatMessage({ id: "MENU.DATAENTRIES.INDRES" })} src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}/>
            </span>
          <span className="menu-text">{intl.formatMessage({ id: "MENU.DATAENTRIES.INDRES" })}</span>
            </NavLink>
          </li>
          {/*end::1 Level*/}


             {/*begin::1 Level*/}
             <li
              className={`menu-item ${getMenuItemActive("/data-entries/glhr", false)}`}
              aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/data-entries/glhr">
            <span className="svg-icon menu-icon">
              <SVG title = {intl.formatMessage({ id: "MENU.DATAENTRIES.GLHR" })} src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}/>
            </span>
          <span className="menu-text">{intl.formatMessage({ id: "MENU.DATAENTRIES.GLHR" })}</span>
            </NavLink>
          </li>
          {/*end::1 Level*/}



             {/*begin::1 Level*/}
             <li
              className={`menu-item ${getMenuItemActive("/data-entries/io", false)}`}
              aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/data-entries/io">
            <span className="svg-icon menu-icon">
              <SVG title = {intl.formatMessage({ id: "MENU.DATAENTRIES.IO" })} src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}/>
            </span>
          <span className="menu-text">{intl.formatMessage({ id: "MENU.DATAENTRIES.IO" })}</span>
            </NavLink>
          </li>
          {/*end::1 Level*/}





             {/*begin::1 Level*/}
             <li
              className={`menu-item ${getMenuItemActive("/data-entries/tvr", false)}`}
              aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/data-entries/tvr">
            <span className="svg-icon menu-icon">
              <SVG  title ={intl.formatMessage({ id: "MENU.DATAENTRIES.TVR" })} src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}/>
            </span>
          <span className="menu-text">{intl.formatMessage({ id: "MENU.DATAENTRIES.TVR" })}</span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

      

        </ul>

        {/* end::Menu Nav */}
      </>
  );
}
