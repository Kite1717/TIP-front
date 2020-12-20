import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
} from "../../../../../_metronic/_partials/controls";
import { NonTipPerformancesFilter } from "./nonTipPerformances-filter/NonTipPerformancesFilter";
import { NonTipPerformancesTable } from "./nonTipPerformances-table/NonTipPerformancesTable";
import { NonTipPerformancesGrouping } from "./nonTipPerformances-grouping/NonTipPerformancesGrouping";
import { useNonTipPerformancesUIContext } from "./NonTipPerformancesUIContext";
import { useIntl } from "react-intl";

export function NonTipPerformancesCard() {
  const nonTipPerformancesUIContext = useNonTipPerformancesUIContext();
  const nonTipPerformancesUIProps = useMemo(() => {
    return {
      ids: nonTipPerformancesUIContext.ids,
      newNonTipPerformanceButtonClick: nonTipPerformancesUIContext.newNonTipPerformanceButtonClick,
    };
  }, [nonTipPerformancesUIContext]);

  const intl = useIntl();
  return (
    <Card>
      <CardHeader title={intl.formatMessage({ id: "MENU.TIPPERFORMANCE.NONTIP" })}>
      </CardHeader>
      <CardBody>
        <NonTipPerformancesFilter />
        {nonTipPerformancesUIProps.ids.length > 0 && <NonTipPerformancesGrouping />}
        <NonTipPerformancesTable />
      </CardBody>
    </Card>
  );
}
