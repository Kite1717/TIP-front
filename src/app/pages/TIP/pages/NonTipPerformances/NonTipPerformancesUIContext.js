import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./NonTipPerformancesUIHelpers";

const NonTipPerformancesUIContext = createContext();

export function useNonTipPerformancesUIContext() {
  return useContext(NonTipPerformancesUIContext);
}

export const NonTipPerformancesUIConsumer = NonTipPerformancesUIContext.Consumer;

export function NonTipPerformancesUIProvider({ nonTipPerformancesUIEvents, children }) {
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

  const initNonTipPerformance = {
    id: undefined,
    fullName: "",
    phoneNumber: "",
    email: "",
    tcNo: "",
    role: "0",
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
    initNonTipPerformance,
    newNonTipPerformanceButtonClick: nonTipPerformancesUIEvents.newNonTipPerformanceButtonClick,
    openEditNonTipPerformanceDialog: nonTipPerformancesUIEvents.openEditNonTipPerformanceDialog,
    openDeleteNonTipPerformanceDialog: nonTipPerformancesUIEvents.openDeleteNonTipPerformanceDialog,
    openDeleteNonTipPerformancesDialog: nonTipPerformancesUIEvents.openDeleteNonTipPerformancesDialog,
    openFetchNonTipPerformancesDialog: nonTipPerformancesUIEvents.openFetchNonTipPerformancesDialog,
    openUpdateNonTipPerformancesStatusDialog: nonTipPerformancesUIEvents.openUpdateNonTipPerformancesStatusDialog
  };

  return <NonTipPerformancesUIContext.Provider value={value}>{children}</NonTipPerformancesUIContext.Provider>;
}