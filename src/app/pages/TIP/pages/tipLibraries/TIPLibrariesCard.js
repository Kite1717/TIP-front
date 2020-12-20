import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { TIPLibrariesFilter } from "./tipLibraries-filter/TIPLibrariesFilter";
import { TIPLibrariesTable } from "./tipLibraries-table/TIPLibrariesTable";
import { TIPLibrariesGrouping } from "./tipLibraries-grouping/TIPLibrariesGrouping";
import { useTIPLibrariesUIContext } from "./TIPLibrariesUIContext";
import { shallowEqual, useSelector } from "react-redux";

export function TIPLibrariesCard() {
  const tipLibrariesUIContext = useTIPLibrariesUIContext();
  const tipLibrariesUIProps = useMemo(() => {
    return {
      ids: tipLibrariesUIContext.ids,
      newTIPLibraryButtonClick: tipLibrariesUIContext.newTIPLibraryButtonClick,
    };
  }, [tipLibrariesUIContext]);

  const { currentUser } = useSelector(
    (state) => ({ 
      currentUser: state.auth.user}),
    shallowEqual
  );


  return (
    <Card>
      <CardHeader title="CTI Kütüphanesi">
      {
      currentUser !== null && currentUser !== undefined &&  currentUser.user !== null && currentUser.user !== undefined && (currentUser.user.role === 0  || currentUser.user.role === 1  )
      &&
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={tipLibrariesUIProps.newTIPLibraryButtonClick}
          >
            Yeni CTI Kütüphanesi
          </button>
        </CardHeaderToolbar>
}
      </CardHeader>
      <CardBody>
        <TIPLibrariesFilter />
        {tipLibrariesUIProps.ids.length > 0 && <TIPLibrariesGrouping />}
        <TIPLibrariesTable />
      </CardBody>
    </Card>
  );
}
