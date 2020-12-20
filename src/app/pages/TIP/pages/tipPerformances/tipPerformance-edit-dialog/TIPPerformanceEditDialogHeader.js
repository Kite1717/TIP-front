import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function TIPPerformanceEditDialogHeader({ id }) {
  // TIPPerformances Redux state
  const { tipPerformanceForEdit, actionsLoading } = useSelector(
    (state) => ({
      tipPerformanceForEdit: state.tipPerformances.tipPerformanceForEdit,
      actionsLoading: state.tipPerformances.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Yeni Personel";
    if (tipPerformanceForEdit && id) {
      _title = `Personeli Düzenle  '${tipPerformanceForEdit.fullName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [tipPerformanceForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
