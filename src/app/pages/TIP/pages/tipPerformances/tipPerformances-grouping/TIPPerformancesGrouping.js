import React, { useMemo } from "react";
import { useTIPPerformancesUIContext } from "../TIPPerformancesUIContext";

export function TIPPerformancesGrouping() {
  // TIPPerformances UI Context
  const tipPerformancesUIContext = useTIPPerformancesUIContext();
  const tipPerformancesUIProps = useMemo(() => {
    return {
      ids: tipPerformancesUIContext.ids,
      setIds: tipPerformancesUIContext.setIds,
      openDeleteTIPPerformancesDialog: tipPerformancesUIContext.openDeleteTIPPerformancesDialog,
      openFetchTIPPerformancesDialog: tipPerformancesUIContext.openFetchTIPPerformancesDialog,
      openUpdateTIPPerformancesStatusDialog:
        tipPerformancesUIContext.openUpdateTIPPerformancesStatusDialog,
    };
  }, [tipPerformancesUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{tipPerformancesUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={tipPerformancesUIProps.openDeleteTIPPerformancesDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={tipPerformancesUIProps.openFetchTIPPerformancesDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={tipPerformancesUIProps.openUpdateTIPPerformancesStatusDialog}
              >
                <i className="fa fa-sync-alt"></i> Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
