import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  NonTipPerformanceStatusCssClasses,
  NonTipPerformanceStatusTitles,
} from "../NonTipPerformancesUIHelpers";
import * as actions from "../../../_redux/NonTipPerformances/NonTipPerformancesActions";
import { useNonTipPerformancesUIContext } from "../NonTipPerformancesUIContext";

const selectedNonTipPerformances = (entities, ids) => {
  const _nonTipPerformances = [];
  ids.forEach((id) => {
    const nonTipPerformance = entities.find((el) => el.id === id);
    if (nonTipPerformance) {
      _nonTipPerformances.push(nonTipPerformance);
    }
  });
  return _nonTipPerformances;
};

export function NonTipPerformancesUpdateStateDialog({ show, onHide }) {
  // NonTipPerformances UI Context
  const nonTipPerformancesUIContext = useNonTipPerformancesUIContext();
  const nonTipPerformancesUIProps = useMemo(() => {
    return {
      ids: nonTipPerformancesUIContext.ids,
      setIds: nonTipPerformancesUIContext.setIds,
      queryParams: nonTipPerformancesUIContext.queryParams,
    };
  }, [nonTipPerformancesUIContext]);

  // NonTipPerformances Redux state
  const { nonTipPerformances, isLoading } = useSelector(
    (state) => ({
      nonTipPerformances: selectedNonTipPerformances(
        state.nonTipPerformances.entities,
        nonTipPerformancesUIProps.ids
      ),
      isLoading: state.nonTipPerformances.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!nonTipPerformancesUIProps.ids || nonTipPerformancesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonTipPerformancesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update nonTipPerformances status by selected ids
    dispatch(actions.updateNonTipPerformancesStatus(nonTipPerformancesUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchNonTipPerformances(nonTipPerformancesUIProps.queryParams)).then(
          () => {
            // clear selections list
            nonTipPerformancesUIProps.setIds([]);
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
          Status has been updated for selected nonTipPerformances
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
              <th>NONTIPPERFORMANCE</th>
            </tr>
          </thead>
          <tbody>
            {nonTipPerformances.map((nonTipPerformance) => (
              <tr key={`id${nonTipPerformance.id}`}>
                <td>{nonTipPerformance.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      NonTipPerformanceStatusCssClasses[nonTipPerformance.status]
                      } label-inline`}
                  >
                    {" "}
                    {NonTipPerformanceStatusTitles[nonTipPerformance.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {nonTipPerformance.lastName}, {nonTipPerformance.firstName}
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
