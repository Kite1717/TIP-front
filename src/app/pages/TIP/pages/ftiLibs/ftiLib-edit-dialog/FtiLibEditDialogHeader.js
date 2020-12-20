import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function FtiLibEditDialogHeader({ id }) {
  // FtiLibs Redux state
  const { ftiLibForEdit, actionsLoading } = useSelector(
    (state) => ({
      ftiLibForEdit: state.ftiLibs.ftiLibForEdit,
      actionsLoading: state.ftiLibs.actionsLoading,
    }),
    shallowEqual
  );

 

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Yeni FTI Kütüphanesi";
    if (ftiLibForEdit && id) {
      _title = `FTI Kütphanesini Düzenle  '${ftiLibForEdit.fullName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [ftiLibForEdit, actionsLoading]);



  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
  
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      
      </Modal.Header>
    </>
  );
}
