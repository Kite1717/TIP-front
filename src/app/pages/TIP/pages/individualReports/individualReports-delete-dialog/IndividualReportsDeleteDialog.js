import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/individualReports/individualReportsActions";
import { useIndividualReportsUIContext } from "../IndividualReportsUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function IndividualReportsDeleteDialog({ show, onHide }) {
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.individualReports.actionsLoading }),
    shallowEqual
  );

  // if individualReports weren't selected we should close modal
  useEffect(() => {
    if (!individualReportsUIProps.ids || individualReportsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [individualReportsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => { }, [isLoading, dispatch]);

  const deleteIndividualReports = () => {
    // server request for deleting individualReport by selected ids
    dispatch(actions.deleteIndividualReports(individualReportsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchIndividualReports(individualReportsUIProps.queryParams)).then(
        () => {
          // clear selections list
          individualReportsUIProps.setIds([]);
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
          IndividualReports Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected individualReports?</span>
        )}
        {isLoading && <span>IndividualReport are deleting...</span>}
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
            onClick={deleteIndividualReports}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
