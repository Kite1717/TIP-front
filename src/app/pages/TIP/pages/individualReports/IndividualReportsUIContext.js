import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./IndividualReportsUIHelpers";

const IndividualReportsUIContext = createContext();

export function useIndividualReportsUIContext() {
  return useContext(IndividualReportsUIContext);
}

export const IndividualReportsUIConsumer = IndividualReportsUIContext.Consumer;

export function IndividualReportsUIProvider({ individualReportsUIEvents, children }) {
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

  const initIndividualReport = {
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
    initIndividualReport,
    newIndividualReportButtonClick: individualReportsUIEvents.newIndividualReportButtonClick,
    openStatusIndividualReportDialog : individualReportsUIEvents.openStatusIndividualReportDialog,
    openEditIndividualReportDialog: individualReportsUIEvents.openEditIndividualReportDialog,
    openDeleteIndividualReportDialog: individualReportsUIEvents.openDeleteIndividualReportDialog,
    openDeleteIndividualReportsDialog: individualReportsUIEvents.openDeleteIndividualReportsDialog,
    openFetchIndividualReportsDialog: individualReportsUIEvents.openFetchIndividualReportsDialog,
    openUpdateIndividualReportsStatusDialog: individualReportsUIEvents.openUpdateIndividualReportsStatusDialog
  };

  return <IndividualReportsUIContext.Provider value={value}>{children}</IndividualReportsUIContext.Provider>;
}