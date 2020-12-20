import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function IndividualReportEditDialogHeader({ id }) {
  // IndividualReports Redux state
  const { individualReportForEdit, actionsLoading } = useSelector(
    (state) => ({
      individualReportForEdit: state.individualReports.individualReportForEdit,
      actionsLoading: state.individualReports.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Yeni Personel";
    if (individualReportForEdit && id) {
      _title = `Personeli Düzenle  '${individualReportForEdit.fullName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [individualReportForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
