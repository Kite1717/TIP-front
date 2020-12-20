import React, { useMemo } from "react";
import { useNonTipPerformancesUIContext } from "../NonTipPerformancesUIContext";

export function NonTipPerformancesGrouping() {
  // NonTipPerformances UI Context
  const nonTipPerformancesUIContext = useNonTipPerformancesUIContext();
  const nonTipPerformancesUIProps = useMemo(() => {
    return {
      ids: nonTipPerformancesUIContext.ids,
      setIds: nonTipPerformancesUIContext.setIds,
      openDeleteNonTipPerformancesDialog: nonTipPerformancesUIContext.openDeleteNonTipPerformancesDialog,
      openFetchNonTipPerformancesDialog: nonTipPerformancesUIContext.openFetchNonTipPerformancesDialog,
      openUpdateNonTipPerformancesStatusDialog:
        nonTipPerformancesUIContext.openUpdateNonTipPerformancesStatusDialog,
    };
  }, [nonTipPerformancesUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{nonTipPerformancesUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={nonTipPerformancesUIProps.openDeleteNonTipPerformancesDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={nonTipPerformancesUIProps.openFetchNonTipPerformancesDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={nonTipPerformancesUIProps.openUpdateNonTipPerformancesStatusDialog}
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
