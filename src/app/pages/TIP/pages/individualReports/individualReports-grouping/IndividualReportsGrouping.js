import React, { useMemo } from "react";
import { useIndividualReportsUIContext } from "../IndividualReportsUIContext";

export function IndividualReportsGrouping() {
  // IndividualReports UI Context
  const individualReportsUIContext = useIndividualReportsUIContext();
  const individualReportsUIProps = useMemo(() => {
    return {
      ids: individualReportsUIContext.ids,
      setIds: individualReportsUIContext.setIds,
      openDeleteIndividualReportsDialog: individualReportsUIContext.openDeleteIndividualReportsDialog,
      openFetchIndividualReportsDialog: individualReportsUIContext.openFetchIndividualReportsDialog,
      openUpdateIndividualReportsStatusDialog:
        individualReportsUIContext.openUpdateIndividualReportsStatusDialog,
    };
  }, [individualReportsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{individualReportsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={individualReportsUIProps.openDeleteIndividualReportsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={individualReportsUIProps.openFetchIndividualReportsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={individualReportsUIProps.openUpdateIndividualReportsStatusDialog}
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
