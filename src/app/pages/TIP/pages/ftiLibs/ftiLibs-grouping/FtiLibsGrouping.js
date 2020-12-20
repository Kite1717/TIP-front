import React, { useMemo } from "react";
import { useFtiLibsUIContext } from "../FtiLibsUIContext";

export function FtiLibsGrouping() {
  // FtiLibs UI Context
  const ftiLibsUIContext = useFtiLibsUIContext();
  const ftiLibsUIProps = useMemo(() => {
    return {
      ids: ftiLibsUIContext.ids,
      setIds: ftiLibsUIContext.setIds,
      openDeleteFtiLibsDialog: ftiLibsUIContext.openDeleteFtiLibsDialog,
      openFetchFtiLibsDialog: ftiLibsUIContext.openFetchFtiLibsDialog,
      openUpdateFtiLibsStatusDialog:
        ftiLibsUIContext.openUpdateFtiLibsStatusDialog,
    };
  }, [ftiLibsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{ftiLibsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={ftiLibsUIProps.openDeleteFtiLibsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={ftiLibsUIProps.openFetchFtiLibsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={ftiLibsUIProps.openUpdateFtiLibsStatusDialog}
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
