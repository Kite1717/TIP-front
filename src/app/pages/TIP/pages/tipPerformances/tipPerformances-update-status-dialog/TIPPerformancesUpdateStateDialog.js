import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  TIPPerformanceStatusCssClasses,
  TIPPerformanceStatusTitles,
} from "../TIPPerformancesUIHelpers";
import * as actions from "../../../_redux/tipPerformances/tipPerformancesActions";
import { useTIPPerformancesUIContext } from "../TIPPerformancesUIContext";

const selectedTIPPerformances = (entities, ids) => {
  const _tipPerformances = [];
  ids.forEach((id) => {
    const tipPerformance = entities.find((el) => el.id === id);
    if (tipPerformance) {
      _tipPerformances.push(tipPerformance);
    }
  });
  return _tipPerformances;
};

export function TIPPerformancesUpdateStateDialog({ show, onHide }) {
  // TIPPerformances UI Context
  const tipPerformancesUIContext = useTIPPerformancesUIContext();
  const tipPerformancesUIProps = useMemo(() => {
    return {
      ids: tipPerformancesUIContext.ids,
      setIds: tipPerformancesUIContext.setIds,
      queryParams: tipPerformancesUIContext.queryParams,
    };
  }, [tipPerformancesUIContext]);

  // TIPPerformances Redux state
  const { tipPerformances, isLoading } = useSelector(
    (state) => ({
      tipPerformances: selectedTIPPerformances(
        state.tipPerformances.entities,
        tipPerformancesUIProps.ids
      ),
      isLoading: state.tipPerformances.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!tipPerformancesUIProps.ids || tipPerformancesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipPerformancesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update tipPerformances status by selected ids
    dispatch(actions.updateTIPPerformancesStatus(tipPerformancesUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchTIPPerformances(tipPerformancesUIProps.queryParams)).then(
          () => {
            // clear selections list
            tipPerformancesUIProps.setIds([]);
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
          Status has been updated for selected tipPerformances
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
              <th>TIPPERFORMANCE</th>
            </tr>
          </thead>
          <tbody>
            {tipPerformances.map((tipPerformance) => (
              <tr key={`id${tipPerformance.id}`}>
                <td>{tipPerformance.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      TIPPerformanceStatusCssClasses[tipPerformance.status]
                      } label-inline`}
                  >
                    {" "}
                    {TIPPerformanceStatusTitles[tipPerformance.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {tipPerformance.lastName}, {tipPerformance.firstName}
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
