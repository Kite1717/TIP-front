import React, { useMemo } from "react";
import { useTIPLibrariesUIContext } from "../TIPLibrariesUIContext";

export function TIPLibrariesGrouping() {
  // TIPLibraries UI Context
  const tipLibrariesUIContext = useTIPLibrariesUIContext();
  const tipLibrariesUIProps = useMemo(() => {
    return {
      ids: tipLibrariesUIContext.ids,
      setIds: tipLibrariesUIContext.setIds,
      openDeleteTIPLibrariesDialog: tipLibrariesUIContext.openDeleteTIPLibrariesDialog,
      openFetchTIPLibrariesDialog: tipLibrariesUIContext.openFetchTIPLibrariesDialog,
      openUpdateTIPLibrariesStatusDialog:
        tipLibrariesUIContext.openUpdateTIPLibrariesStatusDialog,
    };
  }, [tipLibrariesUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{tipLibrariesUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={tipLibrariesUIProps.openDeleteTIPLibrariesDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={tipLibrariesUIProps.openFetchTIPLibrariesDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={tipLibrariesUIProps.openUpdateTIPLibrariesStatusDialog}
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
