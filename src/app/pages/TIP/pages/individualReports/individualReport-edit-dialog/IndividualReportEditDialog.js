import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/individualReports/individualReportsActions";
import { IndividualReportEditDialogHeader } from "./IndividualReportEditDialogHeader";
import { IndividualReportEditForm } from "./IndividualReportEditForm";
import { useIndividualReportsUIContext } from "../IndividualReportsUIContext";

export function IndividualReportEditDialog({ id, show, onHide }) {
  // IndividualReports UI Context
  const individualReportsUIContext = useIndividualReportsUIContext();
  const individualReportsUIProps = useMemo(() => {
    return {
      initIndividualReport: individualReportsUIContext.initIndividualReport,
    };
  }, [individualReportsUIContext]);

  // IndividualReports Redux state
  const dispatch = useDispatch();
  const { actionsLoading, individualReportForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.individualReports.actionsLoading,
      individualReportForEdit: state.individualReports.individualReportForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting IndividualReport by id
    dispatch(actions.fetchIndividualReport(id));
  }, [id, dispatch]);

  // server request for saving individualReport
  const saveIndividualReport = (individualReport) => {
    if (!id) {
      // server request for creating individualReport
      dispatch(actions.createIndividualReport(individualReport)).then(() => onHide());
    } else {
      // server request for updating individualReport
      dispatch(actions.updateIndividualReport(individualReport)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <IndividualReportEditDialogHeader id={id} />
      <IndividualReportEditForm
        saveIndividualReport={saveIndividualReport}
        actionsLoading={actionsLoading}
        individualReport={individualReportForEdit || individualReportsUIProps.initIndividualReport}
        onHide={onHide}
      />
    </Modal>
  );
}
