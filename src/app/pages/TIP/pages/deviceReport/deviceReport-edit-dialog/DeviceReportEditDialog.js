import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/deviceReports/deviceReportsActions";
import { DeviceReportEditDialogHeader } from "./DeviceReportEditDialogHeader";
import { DeviceReportEditForm } from "./DeviceReportEditForm";
import { useDeviceReportsUIContext } from "../DeviceReportsUIContext";

export function DeviceReportEditDialog({ id, show, onHide }) {
  // DeviceReports UI Context
  const deviceReportsUIContext = useDeviceReportsUIContext();
  const deviceReportsUIProps = useMemo(() => {
    return {
      initDeviceReport: deviceReportsUIContext.initDeviceReport,
    };
  }, [deviceReportsUIContext]);

  // DeviceReports Redux state
  const dispatch = useDispatch();
  const { actionsLoading, deviceReportForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.deviceReports.actionsLoading,
      deviceReportForEdit: state.deviceReports.deviceReportForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting DeviceReport by id
    dispatch(actions.fetchDeviceReport(id));
  }, [id, dispatch]);

  // server request for saving deviceReport
  const saveDeviceReport = (deviceReport) => {
    if (!id) {
      // server request for creating deviceReport
      dispatch(actions.createDeviceReport(deviceReport)).then(() => onHide());
    } else {
      // server request for updating deviceReport
      dispatch(actions.updateDeviceReport(deviceReport)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <DeviceReportEditDialogHeader id={id} />
      <DeviceReportEditForm
        saveDeviceReport={saveDeviceReport}
        actionsLoading={actionsLoading}
        deviceReport={deviceReportForEdit || deviceReportsUIProps.initDeviceReport}
        onHide={onHide}
      />
    </Modal>
  );
}
