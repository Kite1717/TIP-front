import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
} from "../../../../../_metronic/_partials/controls";
import { TIPPerformancesFilter } from "./tipPerformances-filter/TIPPerformancesFilter";
import { TIPPerformancesTable } from "./tipPerformances-table/TIPPerformancesTable";
import { TIPPerformancesGrouping } from "./tipPerformances-grouping/TIPPerformancesGrouping";
import { useTIPPerformancesUIContext } from "./TIPPerformancesUIContext";
import { useIntl } from "react-intl";

export function TIPPerformancesCard() {
  const tipPerformancesUIContext = useTIPPerformancesUIContext();
  const tipPerformancesUIProps = useMemo(() => {
    return {
      ids: tipPerformancesUIContext.ids,
      newTIPPerformanceButtonClick: tipPerformancesUIContext.newTIPPerformanceButtonClick,
    };
  }, [tipPerformancesUIContext]);

  const intl = useIntl();
  return (
    <Card>
      <CardHeader title={intl.formatMessage({ id: "MENU.TIPPERFORMANCE.TIP" })}>
      </CardHeader>
      <CardBody>
        <TIPPerformancesFilter />
        {tipPerformancesUIProps.ids.length > 0 && <TIPPerformancesGrouping />}
        <TIPPerformancesTable />
      </CardBody>
    </Card>
  );
}
