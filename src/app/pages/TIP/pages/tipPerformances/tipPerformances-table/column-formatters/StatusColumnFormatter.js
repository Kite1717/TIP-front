// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
import React from "react";
import {
  TIPPerformanceStatusCssClasses,
  TIPPerformanceStatusTitles,
} from "../../TIPPerformancesUIHelpers";

export function StatusColumnFormatter(cellContent, row) {
  const getLabelCssClasses = () => {
    return `label label-lg label-light-${
      TIPPerformanceStatusCssClasses[row.status]
      } label-inline`;
  };
  return (
    <span className={getLabelCssClasses()}>
      {TIPPerformanceStatusTitles[row.status]}
    </span>
  );
}
