import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/systemInformations/systemInformationsActions";
import { SystemInformationEditDialogHeader } from "./SystemInformationEditDialogHeader";
import { SystemInformationEditForm } from "./SystemInformationEditForm";
import { useSystemInformationsUIContext } from "../SystemInformationsUIContext";

export function SystemInformationEditDialog({ id, show, onHide }) {
  // SystemInformations UI Context
  const systemInformationsUIContext = useSystemInformationsUIContext();
  const systemInformationsUIProps = useMemo(() => {
    return {
      initSystemInformation: systemInformationsUIContext.initSystemInformation,
    };
  }, [systemInformationsUIContext]);

  // SystemInformations Redux state
  const dispatch = useDispatch();
  const { actionsLoading, systemInformationForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.systemInformations.actionsLoading,
      systemInformationForEdit: state.systemInformations.systemInformationForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting SystemInformation by id
    dispatch(actions.fetchSystemInformation(id));
  }, [id, dispatch]);

  // server request for saving systemInformation
  const saveSystemInformation = (systemInformation) => {
    if (!id) {
      // server request for creating systemInformation
      dispatch(actions.createSystemInformation(systemInformation)).then(() => onHide());
    } else {
      // server request for updating systemInformation
      dispatch(actions.updateSystemInformation(systemInformation)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <SystemInformationEditDialogHeader id={id} />
      <SystemInformationEditForm
        saveSystemInformation={saveSystemInformation}
        actionsLoading={actionsLoading}
        systemInformation={systemInformationForEdit || systemInformationsUIProps.initSystemInformation}
        onHide={onHide}
      />
    </Modal>
  );
}
