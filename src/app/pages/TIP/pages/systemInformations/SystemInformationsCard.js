import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { SystemInformationsTable } from "./systemInformations-table/SystemInformationsTable";
import { TIPAdminsTable } from "./systemInformations-table/TIPAdminsTable"
import { SystemInformationsGrouping } from "./systemInformations-grouping/SystemInformationsGrouping";
import { useSystemInformationsUIContext } from "./SystemInformationsUIContext";
import { useIntl } from "react-intl";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

export function SystemInformationsCard() {
  const systemInformationsUIContext = useSystemInformationsUIContext();
  const systemInformationsUIProps = useMemo(() => {
    return {
      ids: systemInformationsUIContext.ids,
      newSystemInformationButtonClick: systemInformationsUIContext.newSystemInformationButtonClick,
    };
  }, [systemInformationsUIContext]);


  const { currentUser } = useSelector(
    (state) => ({ 
                  currentUser: state.auth.user.user}),
    shallowEqual
  );






  const intl = useIntl()
  return (
    <>
    <Card>
      <CardHeader title={intl.formatMessage({ id: "MENU.SYSTEM_INFORMATIONS.ADMINS" })} />
      <CardBody>
        <TIPAdminsTable style={{marginBottom:"15px"}} />
      </CardBody>
    </Card>

    <Card>
    
   
    <CardHeader title={intl.formatMessage({ id: "MENU.SYSTEM_INFO" })}>
      {
        currentUser.isTipAdmin &&
        <CardHeaderToolbar>
          <button
         
            type="button"
            className="btn btn-primary"
            onClick={systemInformationsUIProps.newSystemInformationButtonClick}
          >
            {intl.formatMessage({ id: "MENU.SYSTEM_INFORMATIONS.NEW" })}
          </button>
        </CardHeaderToolbar>
      }
        
      </CardHeader>
      <CardBody>
      
        {systemInformationsUIProps.ids.length > 0 && <SystemInformationsGrouping />}
        <SystemInformationsTable  isTipAdmin = { currentUser.isTipAdmin} />
      </CardBody>
    </Card>
    </>
  );
}
