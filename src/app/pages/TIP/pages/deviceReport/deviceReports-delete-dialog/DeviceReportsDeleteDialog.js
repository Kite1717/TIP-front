import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/deviceReports/deviceReportsActions";
import { useDeviceReportsUIContext } from "../DeviceReportsUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function DeviceReportsDeleteDialog({ show, onHide }) {
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.deviceReports.actionsLoading }),
    shallowEqual
  );

  // if deviceReports weren't selected we should close modal
  useEffect(() => {
    if (!deviceReportsUIProps.ids || deviceReportsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceReportsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => { }, [isLoading, dispatch]);

  const deleteDeviceReports = () => {
    // server request for deleting deviceReport by selected ids
    dispatch(actions.deleteDeviceReports(deviceReportsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchDeviceReports(deviceReportsUIProps.queryParams)).then(
        () => {
          // clear selections list
          deviceReportsUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
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
          DeviceReports Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected deviceReports?</span>
        )}
        {isLoading && <span>DeviceReport are deleting...</span>}
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
            onClick={deleteDeviceReports}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
