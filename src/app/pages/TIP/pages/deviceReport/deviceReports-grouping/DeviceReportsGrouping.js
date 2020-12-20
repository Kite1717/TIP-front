import React, { useMemo } from "react";
import { useDeviceReportsUIContext } from "../DeviceReportsUIContext";

export function DeviceReportsGrouping() {
  // DeviceReports UI Context
  const deviceReportsUIContext = useDeviceReportsUIContext();
  const deviceReportsUIProps = useMemo(() => {
    return {
      ids: deviceReportsUIContext.ids,
      setIds: deviceReportsUIContext.setIds,
      openDeleteDeviceReportsDialog: deviceReportsUIContext.openDeleteDeviceReportsDialog,
      openFetchDeviceReportsDialog: deviceReportsUIContext.openFetchDeviceReportsDialog,
      openUpdateDeviceReportsStatusDialog:
        deviceReportsUIContext.openUpdateDeviceReportsStatusDialog,
    };
  }, [deviceReportsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{deviceReportsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={deviceReportsUIProps.openDeleteDeviceReportsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={deviceReportsUIProps.openFetchDeviceReportsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={deviceReportsUIProps.openUpdateDeviceReportsStatusDialog}
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
