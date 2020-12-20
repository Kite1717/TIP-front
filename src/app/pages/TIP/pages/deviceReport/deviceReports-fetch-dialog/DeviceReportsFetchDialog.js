import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  DeviceReportStatusCssClasses,
  DeviceReportStatusTitles,
} from "../DeviceReportsUIHelpers";
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

export function DeviceReportsFetchDialog({ show, onHide }) {
  // DeviceReports UI Context
  const deviceReportsUIContext = useDeviceReportsUIContext();
  const deviceReportsUIProps = useMemo(() => {
    return {
      ids: deviceReportsUIContext.ids,
    };
  }, [deviceReportsUIContext]);

  // DeviceReports Redux state
  const { deviceReports } = useSelector(
    (state) => ({
      deviceReports: selectedDeviceReports(
        state.deviceReports.entities,
        deviceReportsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if deviceReports weren't selected we should close modal
  useEffect(() => {
    if (!deviceReportsUIProps.ids || deviceReportsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceReportsUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
