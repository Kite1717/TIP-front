import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./TIPLibrariesUIHelpers";

const TIPLibrariesUIContext = createContext();

export function useTIPLibrariesUIContext() {
  return useContext(TIPLibrariesUIContext);
}

export const TIPLibrariesUIConsumer = TIPLibrariesUIContext.Consumer;

export function TIPLibrariesUIProvider({ tipLibrariesUIEvents, children }) {
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

  const initTIPLibrary = {
    id: undefined,
    fullName: "",
    phoneNumber: "",
    email: "",
    tcNo: "",
    role: 0,
    deviceIdNo: 0,
    isTipAdmin: 0,
    address: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initTIPLibrary,
    newTIPLibraryButtonClick: tipLibrariesUIEvents.newTIPLibraryButtonClick,
    openEditTIPLibraryDialog: tipLibrariesUIEvents.openEditTIPLibraryDialog,
    openDeleteTIPLibraryDialog: tipLibrariesUIEvents.openDeleteTIPLibraryDialog,
    openDeleteTIPLibrariesDialog: tipLibrariesUIEvents.openDeleteTIPLibrariesDialog,
    openFetchTIPLibrariesDialog: tipLibrariesUIEvents.openFetchTIPLibrariesDialog,
    openUpdateTIPLibrariesStatusDialog: tipLibrariesUIEvents.openUpdateTIPLibrariesStatusDialog
  };

  return <TIPLibrariesUIContext.Provider value={value}>{children}</TIPLibrariesUIContext.Provider>;
}