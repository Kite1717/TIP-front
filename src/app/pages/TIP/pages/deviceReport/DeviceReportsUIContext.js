import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./DeviceReportsUIHelpers";

const DeviceReportsUIContext = createContext();

export function useDeviceReportsUIContext() {
  return useContext(DeviceReportsUIContext);
}

export const DeviceReportsUIConsumer = DeviceReportsUIContext.Consumer;

export function DeviceReportsUIProvider({ deviceReportsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback(nextQueryParams => {
    setQueryParamsBase(prevQueryParams => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initDeviceReport = {
    id: undefined,
    fullName: "",
    phoneNumber: "",
    email: "",
    tcNo: "",
    role:"0",
    deviceIdNo: "",
    isTipAdmin: "0",
    address: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initDeviceReport,
    newDeviceReportButtonClick: deviceReportsUIEvents.newDeviceReportButtonClick,
    openStatusDeviceReportDialog : deviceReportsUIEvents.openStatusDeviceReportDialog,
    openEditDeviceReportDialog: deviceReportsUIEvents.openEditDeviceReportDialog,
    openDeleteDeviceReportDialog: deviceReportsUIEvents.openDeleteDeviceReportDialog,
    openDeleteDeviceReportsDialog: deviceReportsUIEvents.openDeleteDeviceReportsDialog,
    openFetchDeviceReportsDialog: deviceReportsUIEvents.openFetchDeviceReportsDialog,
    openUpdateDeviceReportsStatusDialog: deviceReportsUIEvents.openUpdateDeviceReportsStatusDialog
  };

  return <DeviceReportsUIContext.Provider value={value}>{children}</DeviceReportsUIContext.Provider>;
}