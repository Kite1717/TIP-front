import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  DeviceReportStatusCssClasses,
  DeviceReportStatusTitles,
} from "../DeviceReportsUIHelpers";
import * as actions from "../../../_redux/deviceReports/deviceReportsActions";
import { useDeviceReportsUIContext } from "../DeviceReportsUIContext";

const selectedDeviceReports = (entities, ids) => {
  const _deviceReports = [];
  ids.forEach((id) => {
    const deviceReport = entities.find((el) => el.id === id);
    if (deviceReport) {
      _deviceReports.push(deviceReport);
    }
  });
  return _deviceReports;
};

export function DeviceReportsUpdateStateDialog({ show, onHide }) {
  // DeviceReports UI Context
  const deviceReportsUIContext = useDeviceReportsUIContext();
  const deviceReportsUIProps = useMemo(() => {
    return {
      ids: deviceReportsUIContext.ids,
      setIds: deviceReportsUIContext.setIds,
      queryParams: deviceReportsUIContext.queryParams,
    };
  }, [deviceReportsUIContext]);

  // DeviceReports Redux state
  const { deviceReports, isLoading } = useSelector(
    (state) => ({
      deviceReports: selectedDeviceReports(
        state.deviceReports.entities,
        deviceReportsUIProps.ids
      ),
      isLoading: state.deviceReports.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!deviceReportsUIProps.ids || deviceReportsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceReportsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update deviceReports status by selected ids
    dispatch(actions.updateDeviceReportsStatus(deviceReportsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchDeviceReports(deviceReportsUIProps.queryParams)).then(
          () => {
            // clear selections list
            deviceReportsUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected deviceReports
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}
        <table className="table table table-head-custom table-vertical-center overflow-hidden">
          <thead>
            <tr>
              <th>ID</th>
              <th>STATUS</th>
              <th>DEVICEREPORT</th>
            </tr>
          </thead>
          <tbody>
            {deviceReports.map((deviceReport) => (
              <tr key={`id${deviceReport.id}`}>
                <td>{deviceReport.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      DeviceReportStatusCssClasses[deviceReport.status]
                      } label-inline`}
                  >
                    {" "}
                    {DeviceReportStatusTitles[deviceReport.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {deviceReport.lastName}, {deviceReport.firstName}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Suspended</option>
            <option value="1">Active</option>
            <option value="2">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
