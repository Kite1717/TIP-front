import React, { useMemo } from "react";
import { useSystemInformationsUIContext } from "../SystemInformationsUIContext";

export function SystemInformationsGrouping() {
  // SystemInformations UI Context
  const systemInformationsUIContext = useSystemInformationsUIContext();
  const systemInformationsUIProps = useMemo(() => {
    return {
      ids: systemInformationsUIContext.ids,
      setIds: systemInformationsUIContext.setIds,
      openDeleteSystemInformationsDialog: systemInformationsUIContext.openDeleteSystemInformationsDialog,
      openFetchSystemInformationsDialog: systemInformationsUIContext.openFetchSystemInformationsDialog,
      openUpdateSystemInformationsStatusDialog:
        systemInformationsUIContext.openUpdateSystemInformationsStatusDialog,
    };
  }, [systemInformationsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{systemInformationsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={systemInformationsUIProps.openDeleteSystemInformationsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={systemInformationsUIProps.openFetchSystemInformationsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={systemInformationsUIProps.openUpdateSystemInformationsStatusDialog}
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
