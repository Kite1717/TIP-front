import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ftiLibs/ftiLibsActions";
import { FtiLibEditDialogHeader } from "./FtiLibEditDialogHeader";
import { FtiLibEditForm } from "./FtiLibEditForm";
import { useFtiLibsUIContext } from "../FtiLibsUIContext";

export function FtiLibEditDialog({ id, show, onHide }) {
  // FtiLibs UI Context
  const ftiLibsUIContext = useFtiLibsUIContext();
  const ftiLibsUIProps = useMemo(() => {
    return {
      initFtiLib: ftiLibsUIContext.initFtiLib,
      setIds: ftiLibsUIContext.setIds,
      queryParams: ftiLibsUIContext.queryParams,
    };
  }, [ftiLibsUIContext]);

  // FtiLibs Redux state
  const dispatch = useDispatch();
  const { actionsLoading, ftiLibForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.ftiLibs.actionsLoading,
      ftiLibForEdit: state.ftiLibs.ftiLibForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting FtiLib by id
    dispatch(actions.fetchFtiLib(id));
  }, [id, dispatch]);

  // server request for saving ftiLib
  const saveFtiLib = (ftiLib) => {
   // clear selections list
   ftiLibsUIProps.setIds([]);
   // server call by queryParams
   dispatch(actions.fetchFtiLibs(ftiLibsUIProps.queryParams));
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <FtiLibEditDialogHeader id={id} />
      <FtiLibEditForm
        saveFtiLib={saveFtiLib}
        actionsLoading={actionsLoading}
        ftiLib={ftiLibForEdit || ftiLibsUIProps.initFtiLib}
        onHide={onHide}
      />
    </Modal>
  );
}
