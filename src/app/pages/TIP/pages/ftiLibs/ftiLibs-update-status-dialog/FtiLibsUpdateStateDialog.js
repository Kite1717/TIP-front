import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  FtiLibStatusCssClasses,
  FtiLibStatusTitles,
} from "../FtiLibsUIHelpers";
import * as actions from "../../../_redux/ftiLibs/ftiLibsActions";
import { useFtiLibsUIContext } from "../FtiLibsUIContext";

const selectedFtiLibs = (entities, ids) => {
  const _ftiLibs = [];
  ids.forEach((id) => {
    const ftiLib = entities.find((el) => el.id === id);
    if (ftiLib) {
      _ftiLibs.push(ftiLib);
    }
  });
  return _ftiLibs;
};

export function FtiLibsUpdateStateDialog({ show, onHide }) {
  // FtiLibs UI Context
  const ftiLibsUIContext = useFtiLibsUIContext();
  const ftiLibsUIProps = useMemo(() => {
    return {
      ids: ftiLibsUIContext.ids,
      setIds: ftiLibsUIContext.setIds,
      queryParams: ftiLibsUIContext.queryParams,
    };
  }, [ftiLibsUIContext]);

  // FtiLibs Redux state
  const { ftiLibs, isLoading } = useSelector(
    (state) => ({
      ftiLibs: selectedFtiLibs(
        state.ftiLibs.entities,
        ftiLibsUIProps.ids
      ),
      isLoading: state.ftiLibs.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!ftiLibsUIProps.ids || ftiLibsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ftiLibsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update ftiLibs status by selected ids
    dispatch(actions.updateFtiLibsStatus(ftiLibsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchFtiLibs(ftiLibsUIProps.queryParams)).then(
          () => {
            // clear selections list
            ftiLibsUIProps.setIds([]);
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
          Status has been updated for selected ftiLibs
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
              <th>FTILIB</th>
            </tr>
          </thead>
          <tbody>
            {ftiLibs.map((ftiLib) => (
              <tr key={`id${ftiLib.id}`}>
                <td>{ftiLib.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      FtiLibStatusCssClasses[ftiLib.status]
                      } label-inline`}
                  >
                    {" "}
                    {FtiLibStatusTitles[ftiLib.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {ftiLib.lastName}, {ftiLib.firstName}
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
