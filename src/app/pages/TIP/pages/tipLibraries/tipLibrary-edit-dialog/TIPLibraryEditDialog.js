import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/tipLibraries/tipLibrariesActions";
import { TIPLibraryEditDialogHeader } from "./TIPLibraryEditDialogHeader";
import { TIPLibraryEditForm } from "./TIPLibraryEditForm";
import { useTIPLibrariesUIContext } from "../TIPLibrariesUIContext";

export function TIPLibraryEditDialog({ id, show, onHide }) {
  // TIPLibraries UI Context
  const tipLibrariesUIContext = useTIPLibrariesUIContext();
  const tipLibrariesUIProps = useMemo(() => {
    return {
      setIds: tipLibrariesUIContext.setIds,
      initTIPLibrary: tipLibrariesUIContext.initTIPLibrary,
      queryParams: tipLibrariesUIContext.queryParams,
    };
  }, [tipLibrariesUIContext]);

  // TIPLibraries Redux state
  const dispatch = useDispatch();
  const { actionsLoading, tipLibraryForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.tipLibraries.actionsLoading,
      tipLibraryForEdit: state.tipLibraries.tipLibraryForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting TIPLibrary by id
    dispatch(actions.fetchTIPLibrary(id));
  }, [id, dispatch]);

  // server request for saving tipLibrary
  const saveTIPLibrary = () => {
   
     // clear selections list
     tipLibrariesUIProps.setIds([]);
     // server call by queryParams
     dispatch(actions.fetchTIPLibraries(tipLibrariesUIProps.queryParams));
     // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <TIPLibraryEditDialogHeader id={id} />
      <TIPLibraryEditForm
        saveTIPLibrary={saveTIPLibrary}
        actionsLoading={actionsLoading}
        tipLibrary={tipLibraryForEdit || tipLibrariesUIProps.initTIPLibrary}
        onHide={onHide}
      />
    </Modal>
  );
}
