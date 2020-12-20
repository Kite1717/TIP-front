import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function SystemInformationEditDialogHeader({ id }) {
  // SystemInformations Redux state
  const { systemInformationForEdit, actionsLoading } = useSelector(
    (state) => ({
      systemInformationForEdit: state.systemInformations.systemInformationForEdit,
      actionsLoading: state.systemInformations.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Yeni Sistem Bilgisi";
    if (systemInformationForEdit && id) {
      _title = `Edit systemInformation '${systemInformationForEdit.firstName} ${systemInformationForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [systemInformationForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
