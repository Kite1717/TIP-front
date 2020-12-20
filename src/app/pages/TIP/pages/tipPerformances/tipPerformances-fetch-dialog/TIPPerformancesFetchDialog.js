import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  TIPPerformanceStatusCssClasses,
  TIPPerformanceStatusTitles,
} from "../TIPPerformancesUIHelpers";
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

export function TIPPerformancesFetchDialog({ show, onHide }) {
  // TIPPerformances UI Context
  const tipPerformancesUIContext = useTIPPerformancesUIContext();
  const tipPerformancesUIProps = useMemo(() => {
    return {
      ids: tipPerformancesUIContext.ids,
    };
  }, [tipPerformancesUIContext]);

  // TIPPerformances Redux state
  const { tipPerformances } = useSelector(
    (state) => ({
      tipPerformances: selectedTIPPerformances(
        state.tipPerformances.entities,
        tipPerformancesUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if tipPerformances weren't selected we should close modal
  useEffect(() => {
    if (!tipPerformancesUIProps.ids || tipPerformancesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipPerformancesUIProps.ids]);

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
