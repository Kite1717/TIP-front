import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/tipLibraries/tipLibrariesActions";
import { useTIPLibrariesUIContext } from "../TIPLibrariesUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function TIPLibrariesDeleteDialog({ show, onHide }) {
  // TIPLibraries UI Context
  const tipLibrariesUIContext = useTIPLibrariesUIContext();
  const tipLibrariesUIProps = useMemo(() => {
    return {
      ids: tipLibrariesUIContext.ids,
      setIds: tipLibrariesUIContext.setIds,
      queryParams: tipLibrariesUIContext.queryParams,
    };
  }, [tipLibrariesUIContext]);

  // TIPLibraries Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.tipLibraries.actionsLoading }),
    shallowEqual
  );

  // if tipLibraries weren't selected we should close modal
  useEffect(() => {
    if (!tipLibrariesUIProps.ids || tipLibrariesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipLibrariesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => { }, [isLoading, dispatch]);

  const deleteTIPLibraries = () => {
    // server request for deleting tipLibrary by selected ids
    dispatch(actions.deleteTIPLibraries(tipLibrariesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchTIPLibraries(tipLibrariesUIProps.queryParams)).then(
        () => {
          // clear selections list
          tipLibrariesUIProps.setIds([]);
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
          TIPLibraries Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected tipLibraries?</span>
        )}
        {isLoading && <span>TIPLibrary are deleting...</span>}
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
            onClick={deleteTIPLibraries}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
