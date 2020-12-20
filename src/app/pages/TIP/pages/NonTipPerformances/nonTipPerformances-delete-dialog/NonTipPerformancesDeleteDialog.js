import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/NonTipPerformances/NonTipPerformancesActions";
import { useNonTipPerformancesUIContext } from "../NonTipPerformancesUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function NonTipPerformancesDeleteDialog({ show, onHide }) {
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.nonTipPerformances.actionsLoading }),
    shallowEqual
  );

  // if nonTipPerformances weren't selected we should close modal
  useEffect(() => {
    if (!nonTipPerformancesUIProps.ids || nonTipPerformancesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonTipPerformancesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => { }, [isLoading, dispatch]);

  const deleteNonTipPerformances = () => {
    // server request for deleting nonTipPerformance by selected ids
    dispatch(actions.deleteNonTipPerformances(nonTipPerformancesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchNonTipPerformances(nonTipPerformancesUIProps.queryParams)).then(
        () => {
          // clear selections list
          nonTipPerformancesUIProps.setIds([]);
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
          NonTipPerformances Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected nonTipPerformances?</span>
        )}
        {isLoading && <span>NonTipPerformance are deleting...</span>}
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
            onClick={deleteNonTipPerformances}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
