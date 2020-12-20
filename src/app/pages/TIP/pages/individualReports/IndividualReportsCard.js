import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { IndividualReportsFilter } from "./individualReports-filter/IndividualReportsFilter";
import { IndividualReportsTable } from "./individualReports-table/IndividualReportsTable";
import { IndividualReportsGrouping } from "./individualReports-grouping/IndividualReportsGrouping";
import { useIndividualReportsUIContext } from "./IndividualReportsUIContext";
// import { useIntl } from "react-intl";

export function IndividualReportsCard() {
  const individualReportsUIContext = useIndividualReportsUIContext();
  const individualReportsUIProps = useMemo(() => {
    return {
      ids: individualReportsUIContext.ids,
      newIndividualReportButtonClick: individualReportsUIContext.newIndividualReportButtonClick,
    };
  }, [individualReportsUIContext]);

  // const intl = useIntl();
  return (
    <Card>
      <CardHeader  title="Bireysel Sonuçlar">
        <CardHeaderToolbar>
          
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <IndividualReportsFilter />
        {individualReportsUIProps.ids.length > 0 && <IndividualReportsGrouping />}
        <IndividualReportsTable />
      </CardBody>
    </Card>
  );
}
