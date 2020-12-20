import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ftiLibs/ftiLibsActions";
import { useFtiLibsUIContext } from "../FtiLibsUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function FtiLibsDeleteDialog({ show, onHide }) {
  // FtiLibs UI Context
  const ftiLibsUIContext = useFtiLibsUIContext();
  const ftiLibsUIProps = useMemo(() => {
    return {
      ids: ftiLibsUIContext.ids,
      setIds: ftiLibsUIContext.setIds,
      queryParams: ftiLibsUIContext.queryParams,
    };
  }, [ftiLibsUIContext]);

  // FtiLibs Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.ftiLibs.actionsLoading }),
    shallowEqual
  );

  // if ftiLibs weren't selected we should close modal
  useEffect(() => {
    if (!ftiLibsUIProps.ids || ftiLibsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ftiLibsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => { }, [isLoading, dispatch]);

  const deleteFtiLibs = () => {
    // server request for deleting ftiLib by selected ids
    dispatch(actions.deleteFtiLibs(ftiLibsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchFtiLibs(ftiLibsUIProps.queryParams)).then(
        () => {
          // clear selections list
          ftiLibsUIProps.setIds([]);
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
          FtiLibs Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected ftiLibs?</span>
        )}
        {isLoading && <span>FtiLib are deleting...</span>}
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
            onClick={deleteFtiLibs}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
