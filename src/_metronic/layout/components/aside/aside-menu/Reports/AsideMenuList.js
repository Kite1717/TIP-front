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
              className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
              aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG title = {intl.formatMessage({ id: "MENU.DASHBOARD" })} src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}/>
            </span>
          <span className="menu-text">{intl.formatMessage({ id: "MENU.DASHBOARD" })}</span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

      

          {/* Material-UI */}
          {/*begin::1 Level*/}
          <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                  "/data-entries", true
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
          >
            <NavLink className="menu-link menu-toggle" to="/data-entries">
            <span className="svg-icon menu-icon">
              <SVG title = {intl.formatMessage({ id: "MENU.REPORTS.DATE" })} src={toAbsoluteUrl("/media/svg/icons/Design/Cap-2.svg")}/>
            </span>
              <span className="menu-text">{intl.formatMessage({ id: "MENU.REPORTS.DATE" })}</span>
              <i className="menu-arrow"/>
            </NavLink>
            <div className="menu-submenu ">
              <i className="menu-arrow"/>
              <ul className="menu-subnav">
                <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">{intl.formatMessage({ id: "MENU.REPORTS.DATE" })}</span>
                </span>
                </li>

                {/* reports */}
                {/*begin::2 Level*/}
                <li
                    className={`menu-item menu-item-submenu ${getMenuItemActive(
                        "/data-entries/mir", true
                    )}`}
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                >
                  <NavLink className="menu-link menu-toggle" to="/data-entries/inputs">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Inputs</span>
                    <i className="menu-arrow"/>
                  </NavLink>

                  <NavLink className="menu-link menu-toggle" to="/data-entries/inputs">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Inputs</span>
                    <i className="menu-arrow"/>
                  </NavLink>


                  <NavLink className="menu-link menu-toggle" to="/data-entries/inputs">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Inputs</span>
                    <i className="menu-arrow"/>
                  </NavLink>


                  <NavLink className="menu-link menu-toggle" to="/data-entries/inputs">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Inputs</span>
                    <i className="menu-arrow"/>
                  </NavLink>
                
                </li>
                {/*end::2 Level*/}

                {/* Navigation */}
                {/*begin::2 Level*/}
                <li
                    className={`menu-item menu-item-submenu  ${getMenuItemActive(
                        "/data-entries/navigation", true
                    )}`}
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                >
                  <NavLink className="menu-link menu-toggle" to="/data-entries/navigation">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Navigation</span>
                    <i className="menu-arrow"/>
                  </NavLink>
                  <div className="menu-submenu">
                    <i className="menu-arrow"/>
                    <ul className="menu-subnav">
                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/navigation/bottom-navigation"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/navigation/bottom-navigation">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Bottom Navigation</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/navigation/breadcrumbs"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/navigation/breadcrumbs">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Breadcrumbs</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/navigation/drawern"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/navigation/drawer">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Drawers</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/navigation/links"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/navigation/links">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">NavLinks</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/navigation/menus"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/navigation/menus">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Menus</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/navigation/steppers"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/navigation/steppers">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Steppers</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/navigation/tabs"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/navigation/tabs">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Tabs</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}
                    </ul>
                  </div>
                </li>
                {/*end::2 Level*/}

                {/* Surfaces */}
                {/*begin::2 Level*/}
                <li
                    className={`menu-item menu-item-submenu ${getMenuItemActive(
                        "/data-entries/surfaces", true
                    )}`}
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                >
                  <NavLink className="menu-link menu-toggle" to="/data-entries/surfaces">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Surfaces</span>
                    <i className="menu-arrow"/>
                  </NavLink>
                  <div className="menu-submenu">
                    <i className="menu-arrow"/>
                    <ul className="menu-subnav">
                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/surfaces/app-bar"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/surfaces/app-bar">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">App Bar</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/surfaces/paper"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/surfaces/paper">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Paper</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/surfaces/cards"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/surfaces/cards">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Cards</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/surfaces/expansion-panels"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/surfaces/expansion-panels">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Expansion Panels</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}
                    </ul>
                  </div>
                </li>
                {/*end::2 Level*/}

                {/* Feedback */}
                {/*begin::2 Level*/}
                <li
                    className={`menu-item menu-item-submenu ${getMenuItemActive(
                        "/data-entries/feedback", true
                    )}`}
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                >
                  <NavLink className="menu-link menu-toggle" to="/data-entries/feedback">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Feedback</span>
                    <i className="menu-arrow"/>
                  </NavLink>
                  <div className="menu-submenu">
                    <i className="menu-arrow"/>
                    <ul className="menu-subnav">
                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/feedback/progress"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/feedback/progress">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Progress</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/feedback/dialogs"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/feedback/dialogs">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Dialogs</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/feedback/snackbars"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/feedback/snackbars">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Snackbars</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}
                    </ul>
                  </div>
                </li>
                {/*end::2 Level*/}

                {/* Data Display */}
                {/*begin::2 Level*/}
                <li
                    className={`menu-item menu-item-submenu ${getMenuItemActive(
                        "/data-entries/data-displays", true
                    )}`}
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                >
                  <NavLink className="menu-link menu-toggle" to="/data-entries/data-displays">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Data Display</span>
                    <i className="menu-arrow"/>
                  </NavLink>
                  <div className="menu-submenu">
                    <i className="menu-arrow"/>
                    <ul className="menu-subnav">
                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/data-displays/avatars"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/data-displays/avatars">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Avatars</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/data-displays/badges"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/data-displays/badges">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Badges</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/data-displays/chips"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/data-displays/chips">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Chips</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/data-displays/dividers"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/data-displays/dividers">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Dividers</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/data-displays/icons"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/data-displays/icons">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Icons</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/data-displays/lists"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/data-displays/lists">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Lists</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/data-displays/tables"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/data-displays/tables">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Tables</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/data-displays/tooltips"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/data-displays/tooltips">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Tooltips</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/data-displays/typography"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/data-displays/typography">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Typography</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}
                    </ul>
                  </div>
                </li>
                {/*end::2 Level*/}

                {/* Utils */}
                {/*begin::2 Level*/}
                <li
                    className={`menu-item menu-item-submenu ${getMenuItemActive(
                        "/data-entries/utils", true
                    )}`}
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                >
                  <NavLink className="menu-link menu-toggle" to="/data-entries/utils">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Utils</span>
                    <i className="menu-arrow"/>
                  </NavLink>
                  <div className="menu-submenu">
                    <i className="menu-arrow"/>
                    <ul className="menu-subnav">
                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/utils/click-away-listener"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/utils/click-away-listener">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Click Away Listener</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/utils/no-ssr"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/utils/no-ssr">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">No SSR</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/utils/popover"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/utils/popover">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Popover</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/utils/popper"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/utils/popper">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Popper</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/utils/portal"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/utils/portal">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Portal</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/utils/transitions"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/utils/transitions">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Transitions</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/utils/use-media-query"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/utils/use-media-query">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">useMediaQuery</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}
                    </ul>
                  </div>
                </li>
                {/*end::2 Level*/}

                {/* Layout */}
                {/*begin::2 Level*/}
                <li
                    className={`menu-item menu-item-submenu ${getMenuItemActive(
                        "/data-entries/layout", true
                    )}`}
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                >
                  <NavLink className="menu-link menu-toggle" to="/data-entries/layout">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Layout</span>
                    <i className="menu-arrow"/>
                  </NavLink>
                  <div className="menu-submenu">
                    <i className="menu-arrow"/>
                    <ul className="menu-subnav">
                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/layout/box"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/layout/box">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Box</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/layout/container"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/layout/container">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Container</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/layout/grid"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/layout/grid">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Grid</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/layout/grid-list"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/layout/grid-list">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Grid list</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}

                      {/*begin::3 Level*/}
                      <li
                          className={`menu-item ${getMenuItemActive(
                              "/data-entries/layout/hidden"
                          )}`}
                          aria-haspopup="true"
                      >
                        <NavLink className="menu-link" to="/data-entries/layout/hidden">
                          <i className="menu-bullet menu-bullet-dot">
                            <span/>
                          </i>
                          <span className="menu-text">Hidden</span>
                        </NavLink>
                      </li>
                      {/*end::3 Level*/}
                    </ul>
                  </div>
                </li>
                {/*end::2 Level*/}
              </ul>
            </div>
          </li>
          {/*end::1 Level*/}

          {/* Bootstrap */}
          {/*begin::1 Level*/}
          <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                  "/react-bootstrap", true
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
          >
            <NavLink className="menu-link menu-toggle" to="/react-bootstrap">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Box2.svg")}/>
            </span>
              <span className="menu-text">Bootstrap</span>
              <i className="menu-arrow"/>
            </NavLink>
            <div className="menu-submenu ">
              <ul className="menu-subnav">
                <ul className="menu-subnav">
                  <li
                      className="menu-item  menu-item-parent"
                      aria-haspopup="true"
                  >
                  <span className="menu-link">
                    <span className="menu-text">Bootstrap</span>
                  </span>
                  </li>

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/alert"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/alert">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">Alerts</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/badge"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/badge">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">Badge</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/breadcrumb"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/breadcrumb">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">Breadcrumb</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/buttons"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/buttons">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">Buttons</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/button-group"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/button-group">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">Button Group</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/cards"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/cards">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">Cards</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/carousel"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/carousel">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">Carousel</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/dropdowns"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/dropdowns">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">Dropdowns</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/forms"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/forms">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">Forms</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/input-group"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/input-group">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">Input Group</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/images"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/images">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">Images</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/figures"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/figures">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">Figures</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/jumbotron"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/jumbotron">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">Jumbotron</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/list-group"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/list-group">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">List group</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/modal"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/modal">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">Modal</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/navs"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/navs">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">Navs</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/navbar"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/navbar">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">Navbar</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/overlays"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/overlays">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">Overlays</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/pagination"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/pagination">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">Pagination</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/popovers"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/popovers">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">Popovers</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/progress"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/progress">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">Progress</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/spinners"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/spinners">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">Spinners</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/table"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/table">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">Table</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/tabs"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/tabs">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">Tabs</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/tooltips"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/tooltips">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">Tooltips</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item ${getMenuItemActive(
                          "/react-bootstrap/toasts"
                      )}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/react-bootstrap/toasts">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text">Toasts</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                </ul>
              </ul>
            </div>
          </li>
          {/*end::1 Level*/}

          {/* Applications */}
          {/* begin::section */}
          <li className="menu-section ">
            <h4 className="menu-text">Applications</h4>
            <i className="menu-icon flaticon-more-v2"></i>
          </li>
          {/* end:: section */}

          {/* eCommerce */}
          {/*begin::1 Level*/}
          <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                  "/e-commerce", true
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
          >
            <NavLink className="menu-link menu-toggle" to="/e-commerce">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Bag2.svg")}/>
            </span>
              <span className="menu-text">eCommerce</span>
            </NavLink>
            <div className="menu-submenu">
              <i className="menu-arrow"/>
              <ul className="menu-subnav">
                <li className="menu-item menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">eCommerce</span>
                </span>
                </li>
                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive(
                        "/e-commerce/customers"
                    )}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/e-commerce/customers">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Customers</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}
                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive(
                        "/e-commerce/products"
                    )}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/e-commerce/products">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Products</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}
              </ul>
            </div>
          </li>
          {/*end::1 Level*/}

          {/* Custom */}
          {/* begin::section */}
          <li className="menu-section ">
            <h4 className="menu-text">Custom</h4>
            <i className="menu-icon flaticon-more-v2"></i>
          </li>
          {/* end:: section */}

          {/* Error Pages */}
          {/*begin::1 Level*/}
          <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                  "/error", true
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
          >
            <NavLink className="menu-link menu-toggle" to="/error">
            <span className="svg-icon menu-icon">
              <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Code/Error-circle.svg")}
              />
            </span>
              <span className="menu-text">Error Pages</span>
              <i className="menu-arrow"/>
            </NavLink>
            <div className="menu-submenu ">
              <i className="menu-arrow"/>
              <ul className="menu-subnav">
                <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Error Pages</span>
                </span>
                </li>

                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/error/error-v1")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/error/error-v1">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Error Page - 1</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/error/error-v2")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/error/error-v2">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Error Page -2</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/error/error-v3")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/error/error-v3">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Error Page - 3</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                 {/*begin::2 Level*/}
                 <li
                    className={`menu-item ${getMenuItemActive("/error/error-v4")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/error/error-v4">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Error Page - 4</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                 {/*begin::2 Level*/}
                 <li
                    className={`menu-item ${getMenuItemActive("/error/error-v5")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/error/error-v5">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Error Page - 5</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                 {/*begin::2 Level*/}
                 <li
                    className={`menu-item ${getMenuItemActive("/error/error-v6")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/error/error-v6">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Error Page - 6</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}
              </ul>
            </div>
          </li>
          {/*end::1 Level*/}
        </ul>

        {/* end::Menu Nav */}
      </>
  );
}
