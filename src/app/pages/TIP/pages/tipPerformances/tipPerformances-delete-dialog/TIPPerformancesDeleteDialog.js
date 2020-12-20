import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/tipPerformances/tipPerformancesActions";
import { useTIPPerformancesUIContext } from "../TIPPerformancesUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function TIPPerformancesDeleteDialog({ show, onHide }) {
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.tipPerformances.actionsLoading }),
    shallowEqual
  );

  // if tipPerformances weren't selected we should close modal
  useEffect(() => {
    if (!tipPerformancesUIProps.ids || tipPerformancesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipPerformancesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => { }, [isLoading, dispatch]);

  const deleteTIPPerformances = () => {
    // server request for deleting tipPerformance by selected ids
    dispatch(actions.deleteTIPPerformances(tipPerformancesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchTIPPerformances(tipPerformancesUIProps.queryParams)).then(
        () => {
          // clear selections list
          tipPerformancesUIProps.setIds([]);
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
          TIPPerformances Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected tipPerformances?</span>
        )}
        {isLoading && <span>TIPPerformance are deleting...</span>}
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
            onClick={deleteTIPPerformances}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
