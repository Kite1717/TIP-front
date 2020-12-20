import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function TIPLibraryEditDialogHeader({ id }) {
  // TIPLibraries Redux state
  const { tipLibraryForEdit, actionsLoading } = useSelector(
    (state) => ({
      tipLibraryForEdit: state.tipLibraries.tipLibraryForEdit,
      actionsLoading: state.tipLibraries.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Yeni CTI Kütüphanesi";
    if (tipLibraryForEdit && id) {
      _title = `Kullanıcıyı Düzenle : '${tipLibraryForEdit.fullName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [tipLibraryForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
