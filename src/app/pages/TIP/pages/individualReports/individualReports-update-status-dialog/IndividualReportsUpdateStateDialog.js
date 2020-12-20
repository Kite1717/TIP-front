import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  IndividualReportStatusCssClasses,
  IndividualReportStatusTitles,
} from "../IndividualReportsUIHelpers";
import * as actions from "../../../_redux/individualReports/individualReportsActions";
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

export function IndividualReportsUpdateStateDialog({ show, onHide }) {
  // IndividualReports UI Context
  const individualReportsUIContext = useIndividualReportsUIContext();
  const individualReportsUIProps = useMemo(() => {
    return {
      ids: individualReportsUIContext.ids,
      setIds: individualReportsUIContext.setIds,
      queryParams: individualReportsUIContext.queryParams,
    };
  }, [individualReportsUIContext]);

  // IndividualReports Redux state
  const { individualReports, isLoading } = useSelector(
    (state) => ({
      individualReports: selectedIndividualReports(
        state.individualReports.entities,
        individualReportsUIProps.ids
      ),
      isLoading: state.individualReports.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!individualReportsUIProps.ids || individualReportsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [individualReportsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update individualReports status by selected ids
    dispatch(actions.updateIndividualReportsStatus(individualReportsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchIndividualReports(individualReportsUIProps.queryParams)).then(
          () => {
            // clear selections list
            individualReportsUIProps.setIds([]);
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
          Status has been updated for selected individualReports
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
