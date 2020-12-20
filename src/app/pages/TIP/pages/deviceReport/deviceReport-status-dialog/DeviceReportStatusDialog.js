import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/deviceReports/deviceReportsActions";
import { useDeviceReportsUIContext } from "../DeviceReportsUIContext";
import { useIntl } from "react-intl";
export function DeviceReportStatusDialog({ id, show, onHide }) {

  const intl = useIntl();
  // DeviceReports UI Context
  const deviceReportsUIContext = useDeviceReportsUIContext();
  const deviceReportsUIProps = useMemo(() => {
    return {
      setIds: deviceReportsUIContext.setIds,
      queryParams: deviceReportsUIContext.queryParams
    };
  }, [deviceReportsUIContext]);

  // DeviceReports Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.deviceReports.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => { }, [isLoading, dispatch]);

  const deleteDeviceReport = () => {
    // server request for deleting deviceReport by id
    dispatch(actions.deleteDeviceReport(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchDeviceReports(deviceReportsUIProps.queryParams));
      // clear selections list
      deviceReportsUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
       
        {intl.formatMessage({ id: "MENU.DEVICEREPORTS.DEL" })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span> {intl.formatMessage({ id: "MENU.DEVICEREPORTS.DELETE_MSG" })}</span>
        )}
       
        {isLoading && <span>{intl.formatMessage({ id: "MENU.DEVICEREPORTS.DELETING" })}</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
          {intl.formatMessage({ id: "MENU.CANCEL" })}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteDeviceReport}
            className="btn btn-primary btn-elevate"
          >
           {intl.formatMessage({ id: "MENU.DELETE" })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
