import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  NonTipPerformanceStatusCssClasses,
  NonTipPerformanceStatusTitles,
} from "../NonTipPerformancesUIHelpers";
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

export function NonTipPerformancesFetchDialog({ show, onHide }) {
  // NonTipPerformances UI Context
  const nonTipPerformancesUIContext = useNonTipPerformancesUIContext();
  const nonTipPerformancesUIProps = useMemo(() => {
    return {
      ids: nonTipPerformancesUIContext.ids,
    };
  }, [nonTipPerformancesUIContext]);

  // NonTipPerformances Redux state
  const { nonTipPerformances } = useSelector(
    (state) => ({
      nonTipPerformances: selectedNonTipPerformances(
        state.nonTipPerformances.entities,
        nonTipPerformancesUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if nonTipPerformances weren't selected we should close modal
  useEffect(() => {
    if (!nonTipPerformancesUIProps.ids || nonTipPerformancesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonTipPerformancesUIProps.ids]);

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
