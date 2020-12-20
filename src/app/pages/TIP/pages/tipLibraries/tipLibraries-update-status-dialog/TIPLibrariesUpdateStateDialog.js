import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  TIPLibraryStatusCssClasses,
  TIPLibraryStatusTitles,
} from "../TIPLibrariesUIHelpers";
import * as actions from "../../../_redux/tipLibraries/tipLibrariesActions";
import { useTIPLibrariesUIContext } from "../TIPLibrariesUIContext";

const selectedTIPLibraries = (entities, ids) => {
  const _tipLibraries = [];
  ids.forEach((id) => {
    const tipLibrary = entities.find((el) => el.id === id);
    if (tipLibrary) {
      _tipLibraries.push(tipLibrary);
    }
  });
  return _tipLibraries;
};

export function TIPLibrariesUpdateStateDialog({ show, onHide }) {
  // TIPLibraries UI Context
  const tipLibrariesUIContext = useTIPLibrariesUIContext();
  const tipLibrariesUIProps = useMemo(() => {
    return {
      ids: tipLibrariesUIContext.ids,
      setIds: tipLibrariesUIContext.setIds,
      queryParams: tipLibrariesUIContext.queryParams,
    };
  }, [tipLibrariesUIContext]);

  // TIPLibraries Redux state
  const { tipLibraries, isLoading } = useSelector(
    (state) => ({
      tipLibraries: selectedTIPLibraries(
        state.tipLibraries.entities,
        tipLibrariesUIProps.ids
      ),
      isLoading: state.tipLibraries.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!tipLibrariesUIProps.ids || tipLibrariesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipLibrariesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update tipLibraries status by selected ids
    dispatch(actions.updateTIPLibrariesStatus(tipLibrariesUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchTIPLibraries(tipLibrariesUIProps.queryParams)).then(
          () => {
            // clear selections list
            tipLibrariesUIProps.setIds([]);
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
          Status has been updated for selected tipLibraries
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
              <th>TIPLIBRARY</th>
            </tr>
          </thead>
          <tbody>
            {tipLibraries.map((tipLibrary) => (
              <tr key={`id${tipLibrary.id}`}>
                <td>{tipLibrary.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      TIPLibraryStatusCssClasses[tipLibrary.status]
                      } label-inline`}
                  >
                    {" "}
                    {TIPLibraryStatusTitles[tipLibrary.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {tipLibrary.lastName}, {tipLibrary.firstName}
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
