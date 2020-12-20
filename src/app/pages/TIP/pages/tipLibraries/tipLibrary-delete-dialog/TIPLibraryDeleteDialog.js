import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/tipLibraries/tipLibrariesActions";
import { useTIPLibrariesUIContext } from "../TIPLibrariesUIContext";

export function TIPLibraryDeleteDialog({ id, show, onHide }) {
  // TIPLibraries UI Context
  const tipLibrariesUIContext = useTIPLibrariesUIContext();
  const tipLibrariesUIProps = useMemo(() => {
    return {
      setIds: tipLibrariesUIContext.setIds,
      queryParams: tipLibrariesUIContext.queryParams
    };
  }, [tipLibrariesUIContext]);

  // TIPLibraries Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.tipLibraries.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => { }, [isLoading, dispatch]);

  const deleteTIPLibrary = () => {
    // server request for deleting tipLibrary by id
    dispatch(actions.deleteTIPLibrary(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchTIPLibraries(tipLibrariesUIProps.queryParams));
      // clear selections list
      tipLibrariesUIProps.setIds([]);
      // closing delete modal
      onHide();
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
          TIP Kütüphanesi Silme
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Bu görüntüyü silmek istediğinize emin misiniz?</span>
        )}
        {isLoading && <span>Görüntü siliniyor</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            İptal
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteTIPLibrary}
            className="btn btn-primary btn-elevate"
          >
            Sil
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
