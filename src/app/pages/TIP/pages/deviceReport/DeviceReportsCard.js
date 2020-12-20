import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { DeviceReportsFilter } from "./deviceReports-filter/DeviceReportsFilter";
import { DeviceReportsTable } from "./deviceReports-table/DeviceReportsTable";
import { DeviceReportsGrouping } from "./deviceReports-grouping/DeviceReportsGrouping";
import { useDeviceReportsUIContext } from "./DeviceReportsUIContext";
// import { useIntl } from "react-intl";

export function DeviceReportsCard() {
  const deviceReportsUIContext = useDeviceReportsUIContext();
  const deviceReportsUIProps = useMemo(() => {
    return {
      ids: deviceReportsUIContext.ids,
      newDeviceReportButtonClick: deviceReportsUIContext.newDeviceReportButtonClick,
    };
  }, [deviceReportsUIContext]);

  // const intl = useIntl();
  return (
    <Card>
      <CardHeader  title="Giriş Çıkış Raporları">
        <CardHeaderToolbar>
          
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <DeviceReportsFilter />
        {deviceReportsUIProps.ids.length > 0 && <DeviceReportsGrouping />}
        <DeviceReportsTable />
      </CardBody>
    </Card>
  );
}
