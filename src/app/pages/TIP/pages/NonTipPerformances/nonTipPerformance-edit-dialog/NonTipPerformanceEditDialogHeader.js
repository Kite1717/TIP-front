import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function NonTipPerformanceEditDialogHeader({ id }) {
  // NonTipPerformances Redux state
  const { nonTipPerformanceForEdit, actionsLoading } = useSelector(
    (state) => ({
      nonTipPerformanceForEdit: state.nonTipPerformances.nonTipPerformanceForEdit,
      actionsLoading: state.nonTipPerformances.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Yeni Personel";
    if (nonTipPerformanceForEdit && id) {
      _title = `Personeli Düzenle  '${nonTipPerformanceForEdit.fullName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [nonTipPerformanceForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
