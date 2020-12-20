import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  SystemInformationStatusCssClasses,
  SystemInformationStatusTitles,
} from "../SystemInformationsUIHelpers";
import * as actions from "../../../_redux/systemInformations/systemInformationsActions";
import { useSystemInformationsUIContext } from "../SystemInformationsUIContext";

const selectedSystemInformations = (entities, ids) => {
  const _systemInformations = [];
  ids.forEach((id) => {
    const systemInformation = entities.find((el) => el.id === id);
    if (systemInformation) {
      _systemInformations.push(systemInformation);
    }
  });
  return _systemInformations;
};

export function SystemInformationsUpdateStateDialog({ show, onHide }) {
  // SystemInformations UI Context
  const systemInformationsUIContext = useSystemInformationsUIContext();
  const systemInformationsUIProps = useMemo(() => {
    return {
      ids: systemInformationsUIContext.ids,
      setIds: systemInformationsUIContext.setIds,
      queryParams: systemInformationsUIContext.queryParams,
    };
  }, [systemInformationsUIContext]);

  // SystemInformations Redux state
  const { systemInformations, isLoading } = useSelector(
    (state) => ({
      systemInformations: selectedSystemInformations(
        state.systemInformations.entities,
        systemInformationsUIProps.ids
      ),
      isLoading: state.systemInformations.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!systemInformationsUIProps.ids || systemInformationsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemInformationsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update systemInformations status by selected ids
    dispatch(actions.updateSystemInformationsStatus(systemInformationsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchSystemInformations(systemInformationsUIProps.queryParams)).then(
          () => {
            // clear selections list
            systemInformationsUIProps.setIds([]);
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
          Status has been updated for selected systemInformations
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
              <th>SYSTEMINFORMATION</th>
            </tr>
          </thead>
          <tbody>
            {systemInformations.map((systemInformation) => (
              <tr key={`id${systemInformation.id}`}>
                <td>{systemInformation.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      SystemInformationStatusCssClasses[systemInformation.status]
                      } label-inline`}
                  >
                    {" "}
                    {SystemInformationStatusTitles[systemInformation.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {systemInformation.lastName}, {systemInformation.firstName}
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
