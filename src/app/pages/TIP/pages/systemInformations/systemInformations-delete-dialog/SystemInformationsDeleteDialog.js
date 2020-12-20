import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/systemInformations/systemInformationsActions";
import { useSystemInformationsUIContext } from "../SystemInformationsUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function SystemInformationsDeleteDialog({ show, onHide }) {
  // SystemInformations UI Context
  const systemInformationsUIContext = useSystemInformationsUIContext();
  const systemInformationsUIProps = useMemo(() => {
    return {
      ids: systemInformationsUIContext.ids,
      setIds: systemInformationsUIContext.setIds,
      queryParams: systemInformationsUIContext.queryParams,
    };
  }, [systemInformationsUIContext]);

  // SystemInformations Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.systemInformations.actionsLoading }),
    shallowEqual
  );

  // if systemInformations weren't selected we should close modal
  useEffect(() => {
    if (!systemInformationsUIProps.ids || systemInformationsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemInformationsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => { }, [isLoading, dispatch]);

  const deleteSystemInformations = () => {
    // server request for deleting systemInformation by selected ids
    dispatch(actions.deleteSystemInformations(systemInformationsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchSystemInformations(systemInformationsUIProps.queryParams)).then(
        () => {
          // clear selections list
          systemInformationsUIProps.setIds([]);
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
          Silme İşlemi
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Seçili alanı silmek istediğinize emin misiniz?</span>
        )}
        {isLoading && <span>Sistem Bilgisi Siliniyor...</span>}
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
            onClick={deleteSystemInformations}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
