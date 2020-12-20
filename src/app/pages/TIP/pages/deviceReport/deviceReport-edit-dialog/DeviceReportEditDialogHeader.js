import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function DeviceReportEditDialogHeader({ id }) {
  // DeviceReports Redux state
  const { deviceReportForEdit, actionsLoading } = useSelector(
    (state) => ({
      deviceReportForEdit: state.deviceReports.deviceReportForEdit,
      actionsLoading: state.deviceReports.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Yeni Personel";
    if (deviceReportForEdit && id) {
      _title = `Personeli Düzenle  '${deviceReportForEdit.fullName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [deviceReportForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
