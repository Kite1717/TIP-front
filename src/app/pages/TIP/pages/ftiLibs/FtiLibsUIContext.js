import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./FtiLibsUIHelpers";

const FtiLibsUIContext = createContext();

export function useFtiLibsUIContext() {
  return useContext(FtiLibsUIContext);
}

export const FtiLibsUIConsumer = FtiLibsUIContext.Consumer;

export function FtiLibsUIProvider({ ftiLibsUIEvents, children }) {
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

  const initFtiLib = {
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
    initFtiLib,
    newFtiLibButtonClick: ftiLibsUIEvents.newFtiLibButtonClick,
    openEditFtiLibDialog: ftiLibsUIEvents.openEditFtiLibDialog,
    openDeleteFtiLibDialog: ftiLibsUIEvents.openDeleteFtiLibDialog,
    openDeleteFtiLibsDialog: ftiLibsUIEvents.openDeleteFtiLibsDialog,
    openFetchFtiLibsDialog: ftiLibsUIEvents.openFetchFtiLibsDialog,
    openUpdateFtiLibsStatusDialog: ftiLibsUIEvents.openUpdateFtiLibsStatusDialog
  };

  return <FtiLibsUIContext.Provider value={value}>{children}</FtiLibsUIContext.Provider>;
}