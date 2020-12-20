import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  IndividualReportStatusCssClasses,
  IndividualReportStatusTitles,
} from "../IndividualReportsUIHelpers";
import { useIndividualReportsUIContext } from "../IndividualReportsUIContext";

const selectedIndividualReports = (entities, ids) => {
  const _individualReports = [];
  ids.forEach((id) => {
    const individualReport = entities.find((el) => el.id === id);
    if (individualReport) {
      _individualReports.push(individualReport);
    }
  });
  return _individualReports;
};

export function IndividualReportsFetchDialog({ show, onHide }) {
  // IndividualReports UI Context
  const individualReportsUIContext = useIndividualReportsUIContext();
  const individualReportsUIProps = useMemo(() => {
    return {
      ids: individualReportsUIContext.ids,
    };
  }, [individualReportsUIContext]);

  // IndividualReports Redux state
  const { individualReports } = useSelector(
    (state) => ({
      individualReports: selectedIndividualReports(
        state.individualReports.entities,
        individualReportsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if individualReports weren't selected we should close modal
  useEffect(() => {
    if (!individualReportsUIProps.ids || individualReportsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [individualReportsUIProps.ids]);

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
              <th>INDIVIDUALREPORTS</th>
            </tr>
          </thead>
          <tbody>
            {individualReports.map((individualReport) => (
              <tr key={`id${individualReport.id}`}>
                <td>{individualReport.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      IndividualReportStatusCssClasses[individualReport.status]
                      } label-inline`}
                  >
                    {" "}
                    {IndividualReportStatusTitles[individualReport.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {individualReport.lastName}, {individualReport.firstName}
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
