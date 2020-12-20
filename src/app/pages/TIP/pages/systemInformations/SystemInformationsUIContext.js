import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./SystemInformationsUIHelpers";

const SystemInformationsUIContext = createContext();

export function useSystemInformationsUIContext() {
  return useContext(SystemInformationsUIContext);
}

export const SystemInformationsUIConsumer = SystemInformationsUIContext.Consumer;

export function SystemInformationsUIProvider({ systemInformationsUIEvents, children }) {
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

  const initSystemInformation = {
    id: undefined,
    tipSoftwareVersions: "",
    softwareTechnicalFeatures: "",
    standAloneMode: "0",
    networkMode: "0",
    xRayDevices: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initSystemInformation,
    newSystemInformationButtonClick: systemInformationsUIEvents.newSystemInformationButtonClick,
    openEditSystemInformationDialog: systemInformationsUIEvents.openEditSystemInformationDialog,
    openDeleteSystemInformationDialog: systemInformationsUIEvents.openDeleteSystemInformationDialog,
    openDeleteSystemInformationsDialog: systemInformationsUIEvents.openDeleteSystemInformationsDialog,
    openFetchSystemInformationsDialog: systemInformationsUIEvents.openFetchSystemInformationsDialog,
    openUpdateSystemInformationsStatusDialog: systemInformationsUIEvents.openUpdateSystemInformationsStatusDialog
  };

  return <SystemInformationsUIContext.Provider value={value}>{children}</SystemInformationsUIContext.Provider>;
}