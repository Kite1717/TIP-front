/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from "react";
import objectPath from "object-path";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../_helpers";
// import { AsideSearch } from "./AsideSearch";
import { LanguageSelectorDropdown } from "../extras/dropdowns/LanguageSelectorDropdown";
import { QuickUserToggler } from "../extras/QuickUserToggler";
import { Brand } from "../brand/Brand";
import { KTUtil } from "./../../../_assets/js/components/util";
import { useIntl } from "react-intl";
import { NavLink } from "react-router-dom";

//asides
import { shallowEqual, useDispatch, useSelector } from "react-redux";

// import { AsideMenuReports } from "./aside-menu/Reports/AsideMenu";
import { AsideMenuLibrary } from "./aside-menu/Library/AsideMenu";
import { AsideMenuDataEntries } from "./aside-menu/DataEntries/AsideMenu";
import { AsideMenuTipPerformance } from "./aside-menu/TipPerformance/AsideMenu";
import { AsideMenuDeviceReports } from "./aside-menu/DeviceReports/AsideMenu";
import { AsideMenuUsers } from "./aside-menu/Users/AsideMenu";
import { AsideMenuSystemInformations } from "./aside-menu/SystemInformations/AsideMenu";




export function Aside() {

  
  const { currentState,currentUser } = useSelector(
    (state) => ({ currentState: state.users ,
                  currentUser: state.auth.user.user}),
    shallowEqual
  );

  const intl = useIntl();
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      asideClassesFromConfig: uiService.getClasses("aside", false),
      asideSecondaryDisplay: objectPath.get(
        uiService.config,
        "aside.secondary.display"
      ),
      asideSelfMinimizeToggle: objectPath.get(
        uiService.config,
        "aside.self.minimize.toggle"
      ),
      extrasSearchDisplay: objectPath.get(
        uiService.config,
        "extras.search.display"
      ),
      extrasNotificationsDisplay: objectPath.get(
        uiService.config,
        "extras.notifications.display"
      ),
      extrasQuickActionsDisplay: objectPath.get(
        uiService.config,
        "extras.quick-actions.display"
      ),
      extrasQuickPanelDisplay: objectPath.get(
        uiService.config,
        "extras.quick-panel.display"
      ),
      extrasLanguagesDisplay: objectPath.get(
        uiService.config,
        "extras.languages.display"
      ),
      extrasUserDisplay: objectPath.get(
        uiService.config,
        "extras.user.display"
      ),
    };
  }, [uiService]);

  const tabs = {
    users: "kt_aside_tab_0",
    systemInfo: "kt_aside_tab_1",
    dataEntry: "kt_aside_tab_2",
    tipLibrary: "kt_aside_tab_3",
    tipPerformance: "kt_aside_tab_4",
    reports: "kt_aside_tab_5"


  };




  const getInitAside = () => {
    const pieces = window.location.href.split("/");

    if (pieces.length > 1 && pieces[3] === "users") {
      return tabs.users
    }
    else if (pieces.length > 1 && pieces[3] === "tip-libraries") {
      return tabs.tipLibrary

    }
    else if (pieces.length > 1 && pieces[3] === "tipPerformances") {
      return tabs.tipPerformance

    }
    else if (pieces.length > 1 && pieces[3] === "reports") {
      return tabs.reports

    }
    else if (pieces.length > 1 && pieces[3] === "system-informations") {
      return tabs.systemInfo

    }
    else if (pieces.length > 1 && pieces[3] === "data-entries") {
      return tabs.dataEntry

    }else{
      return tabs.users
    }

  }

  const initTab = getInitAside()
  const [activeTab, setActiveTab] = useState(initTab)
  const handleTabChange = (id) => {
    setActiveTab(id);
    const asideWorkspace = KTUtil.find(
      document.getElementById("kt_aside"),
      ".aside-secondary .aside-workspace"
    );
    if (asideWorkspace) {
      KTUtil.scrollUpdate(asideWorkspace);
    }
  };



  return (
    <>
      {/* begin::Aside */}
      <div
        id="kt_aside"
        className={`aside aside-left d-flex ${layoutProps.asideClassesFromConfig}`}
      >
        {/* begin::Primary */}
        <div className="aside-primary d-flex flex-column align-items-center flex-row-auto">
          <Brand />
          {/* begin::Nav Wrapper */}
          <div className="aside-nav d-flex flex-column align-items-center flex-column-fluid py-5 scroll scroll-pull">
            {/* begin::Nav */}
            <ul className="list-unstyled flex-column" role="tablist">
              {/* begin::Item */}
              {/* <li
                aria-haspopup="true"
                className="nav-item mb-3"
                data-toggle="tooltip"
           
              
                title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="latest-project">{intl.formatMessage({ id: "MENU.DASHBOARD" })}</Tooltip>
                  }
                >

                          
                    <NavLink     className={`nav-link btn btn-icon btn-clean btn-lg`} to="/dashboard">
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Home/Home.svg"
                        )}
                      />
                    </span>
                    </NavLink>
                 
                </OverlayTrigger>
              </li> */}
              {/* end::Item */}

              {/* begin::Item */}
              <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title={intl.formatMessage({ id: "MENU.USERS" })}
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="metronic-features">{intl.formatMessage({ id: "MENU.USERS" })}</Tooltip>
                  }
                >
                  <NavLink onClick={() => handleTabChange(tabs.users)} className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                    tabs.users && "active"}`} to="/users">
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                     title={intl.formatMessage({ id: "MENU.USERS" })}
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Communication/Group.svg"
                        )}
                      />
                    </span>
                  </NavLink>
                </OverlayTrigger>
              </li>
              {/* end::Item */}

              {/* begin::Item */}
              <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title={intl.formatMessage({ id: "MENU.SYSTEM_INFO" })}
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="latest-reports">{intl.formatMessage({ id: "MENU.SYSTEM_INFO" })}</Tooltip>
                  }
                >
                  <NavLink onClick={() => handleTabChange(tabs.systemInfo)} className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                    tabs.systemInfo && "active"}`} to="/system-informations">
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                     title={intl.formatMessage({ id: "MENU.SYSTEM_INFO" })}
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Code/Info-circle.svg"
                        )}
                      />
                    </span>
                  </NavLink>
                </OverlayTrigger>
              </li>
              {/* end::Item */}

              {/* begin::Item */}
              {
                currentUser !== null && currentUser !== undefined &&  (currentUser.isTipAdmin  || currentUser.role === 1   )
                &&
              <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title={intl.formatMessage({ id: "MENU.DATAENTRIES" })}
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="data-entries">
                      {intl.formatMessage({ id: "MENU.DATAENTRIES" })}
                    </Tooltip>
                  }
                >
                  <NavLink onClick={() => handleTabChange(tabs.dataEntry)} className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                    tabs.dataEntry && "active"}`} to="/data-entries/mir">
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                       title={intl.formatMessage({ id: "MENU.DATAENTRIES" })}
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Navigation/Plus.svg"
                        )}
                      />
                    </span>
                  </NavLink>
                </OverlayTrigger>
              </li>
}
              {/* end::Item */}

              {/* begin::Item */}

              {
               currentUser !== null && currentUser !== undefined &&  (currentUser.isTipAdmin  || currentUser.role === 1   )
                &&
                <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title={intl.formatMessage({ id: "MENU.TIP_LIBRARY" })}
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="project-management">
                      {intl.formatMessage({ id: "MENU.TIP_LIBRARY" })}
                    </Tooltip>
                  }
                >
                  <NavLink onClick={() => handleTabChange(tabs.tipLibrary)} className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                    tabs.tipLibrary && "active"}`} to="/tip-libraries/cti">
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                        title={intl.formatMessage({ id: "MENU.TIP_LIBRARY" })}
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Home/Library.svg"
                        )}
                      />
                    </span>
                  </NavLink>
                </OverlayTrigger>
              </li>

              }
             
              {/* end::Item */}

              {/* begin::Item */}
              <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title={intl.formatMessage({ id: "MENU.TIP_PERFORMANCE" })}
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="user-management"> {intl.formatMessage({ id: "MENU.TIP_PERFORMANCE" })}</Tooltip>
                  }
                >
                  <NavLink onClick={() => handleTabChange(tabs.tipPerformance)} className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                    tabs.tipPerformance && "active"}`} to="/tipPerformances/tip">
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                      title={intl.formatMessage({ id: "MENU.TIP_PERFORMANCE" })}
                        src={toAbsoluteUrl("/media/svg/icons/Layout/Layout-top-panel-4.svg")}
                      />
                    </span>
                  </NavLink>
                </OverlayTrigger>
              </li>
              {/* end::Item */}



              {/* begin::Item */}
              <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title={intl.formatMessage({ id: "MENU.REPORTS" })}
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="finance-accounting">
                      {intl.formatMessage({ id: "MENU.REPORTS" })}
                    </Tooltip>
                  }
                >
                  <NavLink onClick={() => handleTabChange(tabs.reports)} className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                    tabs.reports && "active"}`} to="/reports/device-reports">
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                       title={intl.formatMessage({ id: "MENU.REPORTS" })}
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Media/Equalizer.svg"
                        )}
                      />
                    </span>
                  </NavLink>
                </OverlayTrigger>
              </li>
              {/* end::Item */}


              {/* begin::Item */}
              <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title={intl.formatMessage({ id: "MENU.EXIT" })}
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="finance-accounting">
                      {intl.formatMessage({ id: "MENU.EXIT" })}
                    </Tooltip>
                  }
                >
                  <NavLink className={`nav-link btn btn-icon btn-clean btn-lg`} to="/logout">
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                      title={intl.formatMessage({ id: "MENU.EXIT" })}
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Electric/Shutdown.svg"
                        )}
                      />
                    </span>
                  </NavLink>
                </OverlayTrigger>
              </li>
              {/* end::Item */}
            </ul>
            {/* end::Nav */}
          </div>
          {/* end::Nav Wrapper */}

          {/* begin::Footer */}
          <div className="aside-footer d-flex flex-column align-items-center flex-column-auto py-4 py-lg-10">
            {/* begin::Aside Toggle */}
            {layoutProps.asideSecondaryDisplay &&
              layoutProps.asideSelfMinimizeToggle && (
                <>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip id="toggle-aside">Aç/Kapat</Tooltip>}
                  >
                    <span
                      className="aside-toggle btn btn-icon btn-primary btn-hover-primary shadow-sm"
                      id="kt_aside_toggle"
                    >
                      <i className="ki ki-bold-arrow-back icon-sm" />
                    </span>
                  </OverlayTrigger>
                </>
              )}
            {/* end::Aside Toggle */}

            {/* begin::Search */}
            {layoutProps.extrasSearchDisplay && (
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="toggle-search">Quick Search</Tooltip>}
              >
                <a
                  href="#"
                  className="btn btn-icon btn-clean btn-lg mb-1"
                  id="kt_quick_search_toggle"
                >
                  <span className="svg-icon svg-icon-lg">
                    <SVG
                      src={toAbsoluteUrl("/media/svg/icons/General/Search.svg")}
                    />
                  </span>
                </a>
              </OverlayTrigger>
            )}
            {/* end::Search */}

            {/* begin::Notifications */}
            {layoutProps.extrasNotificationsDisplay && (
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="toggle-notifications">Notifications</Tooltip>
                }
              >
                <a
                  href="#"
                  className="btn btn-icon btn-clean btn-lg mb-1 position-relative"
                  id="kt_quick_notifications_toggle"
                  data-placement="right"
                  data-container="body"
                  data-boundary="window"
                >
                  <span className="svg-icon svg-icon-lg">
                    <SVG
                      src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                    />
                  </span>
                </a>
              </OverlayTrigger>
            )}
            {/* end::Notifications */}

            {/* begin::Quick Actions */}
            {/* {layoutProps.extrasQuickActionsDisplay && (
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="toggle-quick-actions">Quick Actions</Tooltip>
                }
              >
                <a
                  href="#"
                  className="btn btn-icon btn-clean btn-lg mb-1"
                  id="kt_quick_actions_toggle"
                >
                  <span className="svg-icon svg-icon-lg">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Media/Equalizer.svg"
                      )}
                    />
                  </span>
                </a>
              </OverlayTrigger>
            )} */}
            {/* end::Quick Actions */}

            {/* begin::Quick Panel */}
            {/* {layoutProps.extrasQuickPanelDisplay && (
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="toggle-quick-panel">Quick Panel</Tooltip>}
              >
                <a
                  href="#"
                  className="btn btn-icon btn-clean btn-lg mb-1 position-relative"
                  id="kt_quick_panel_toggle"
                  data-placement="right"
                  data-container="body"
                  data-boundary="window"
                >
                  <span className="svg-icon svg-icon-lg">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Layout/Layout-4-blocks.svg"
                      )}
                    />
                  </span>
                  <span className="label label-sm label-light-danger label-rounded font-weight-bolder position-absolute top-0 right-0 mt-1 mr-1">
                    3
                  </span>
                </a>
              </OverlayTrigger>
            )} */}
            {/* end::Quick Panel */}

            {/* begin::Languages*/}
            <LanguageSelectorDropdown />
            {/* end::Languages */}

            {/* begin::User*/}
            {layoutProps.extrasUserDisplay && <QuickUserToggler />}
            {/* end::User */}
          </div>
          {/* end::Footer */}
        </div>
        {/* end::Primary */}

        {layoutProps.asideSecondaryDisplay && (
          <>
            {/* begin::Secondary */}
            <div className="aside-secondary d-flex flex-row-fluid">
              {/* begin::Workspace */}
              <div className="aside-workspace scroll scroll-push my-2">
                <div className="tab-content">
                  {/* <AsideSearch  layoutProps = {layoutProps}isActive={activeTab === tabs.systemInfo} /> */}

                  <AsideMenuUsers isActive={activeTab === tabs.users} />
                  <AsideMenuLibrary isActive={activeTab === tabs.tipLibrary} />
                  <AsideMenuDeviceReports isActive={activeTab === tabs.reports} />
                  <AsideMenuDataEntries isActive={activeTab === tabs.dataEntry} />
                  <AsideMenuTipPerformance isActive={activeTab === tabs.tipPerformance} />
                  <AsideMenuSystemInformations isActive={activeTab === tabs.systemInfo} />



                </div>
              </div>
              {/* end::Workspace */}
            </div>
            {/* end::Secondary */}
          </>
        )}
      </div>
      {/* end::Aside */}
    </>
  );
}
