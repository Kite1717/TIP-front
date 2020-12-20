import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { FtiLibsFilter } from "./ftiLibs-filter/FtiLibsFilter";
import { FtiLibsTable } from "./ftiLibs-table/FtiLibsTable";
import { FtiLibsGrouping } from "./ftiLibs-grouping/FtiLibsGrouping";
import { useFtiLibsUIContext } from "./FtiLibsUIContext";
import { useIntl } from "react-intl";
import { shallowEqual, useSelector } from "react-redux";

export function FtiLibsCard() {
  const ftiLibsUIContext = useFtiLibsUIContext();
  const ftiLibsUIProps = useMemo(() => {
    return {
      ids: ftiLibsUIContext.ids,
      newFtiLibButtonClick: ftiLibsUIContext.newFtiLibButtonClick,
    };
  }, [ftiLibsUIContext]);

  const { currentUser } = useSelector(
    (state) => ({ 
      currentUser: state.auth.user}),
    shallowEqual
  );

  const intl = useIntl();
  return (
    <Card>
      <CardHeader  title={intl.formatMessage({ id: "MENU.FTILIBS" })}>
      {
      currentUser !== null && currentUser !== undefined &&  currentUser.user !== null && currentUser.user !== undefined && (currentUser.user.role === 0  || currentUser.user.role === 1  )
      &&
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={ftiLibsUIProps.newFtiLibButtonClick}
          >
            
            {intl.formatMessage({ id: "MENU.FTILIBS.NEW_FTILIB" })}
          </button>
        </CardHeaderToolbar>
    } 
      </CardHeader>
      <CardBody>
        <FtiLibsFilter />
        {ftiLibsUIProps.ids.length > 0 && <FtiLibsGrouping />}
        <FtiLibsTable />
      </CardBody>
    </Card>
  );
}
