import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./TIPPerformancesUIHelpers";

const TIPPerformancesUIContext = createContext();

export function useTIPPerformancesUIContext() {
  return useContext(TIPPerformancesUIContext);
}

export const TIPPerformancesUIConsumer = TIPPerformancesUIContext.Consumer;

export function TIPPerformancesUIProvider({ tipPerformancesUIEvents, children }) {
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

  const initTIPPerformance = {
    id: undefined,
    fullName: "",
    phoneNumber: "",
    email: "",
    tcNo: "",
    role: "0",
    deviceIdNo: "",
    isTIPAdmin: "0",
    address: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initTIPPerformance,
    newTIPPerformanceButtonClick: tipPerformancesUIEvents.newTIPPerformanceButtonClick,
    openEditTIPPerformanceDialog: tipPerformancesUIEvents.openEditTIPPerformanceDialog,
    openDeleteTIPPerformanceDialog: tipPerformancesUIEvents.openDeleteTIPPerformanceDialog,
    openDeleteTIPPerformancesDialog: tipPerformancesUIEvents.openDeleteTIPPerformancesDialog,
    openFetchTIPPerformancesDialog: tipPerformancesUIEvents.openFetchTIPPerformancesDialog,
    openUpdateTIPPerformancesStatusDialog: tipPerformancesUIEvents.openUpdateTIPPerformancesStatusDialog
  };

  return <TIPPerformancesUIContext.Provider value={value}>{children}</TIPPerformancesUIContext.Provider>;
}