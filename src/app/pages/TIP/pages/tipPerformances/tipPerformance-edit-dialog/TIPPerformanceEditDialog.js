import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/tipPerformances/tipPerformancesActions";
import { TIPPerformanceEditDialogHeader } from "./TIPPerformanceEditDialogHeader";
import { TIPPerformanceEditForm } from "./TIPPerformanceEditForm";
import { useTIPPerformancesUIContext } from "../TIPPerformancesUIContext";

export function TIPPerformanceEditDialog({ id, show, onHide }) {
  // TIPPerformances UI Context
  const tipPerformancesUIContext = useTIPPerformancesUIContext();
  const tipPerformancesUIProps = useMemo(() => {
    return {
      initTIPPerformance: tipPerformancesUIContext.initTIPPerformance,
    };
  }, [tipPerformancesUIContext]);

  // TIPPerformances Redux state
  const dispatch = useDispatch();
  const { actionsLoading, tipPerformanceForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.tipPerformances.actionsLoading,
      tipPerformanceForEdit: state.tipPerformances.tipPerformanceForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting TIPPerformance by id
    dispatch(actions.fetchTIPPerformance(id));
  }, [id, dispatch]);

  // server request for saving tipPerformance
  const saveTIPPerformance = (tipPerformance) => {
    if (!id) {
      // server request for creating tipPerformance
      dispatch(actions.createTIPPerformance(tipPerformance)).then(() => onHide());
    } else {
      // server request for updating tipPerformance
      dispatch(actions.updateTIPPerformance(tipPerformance)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <TIPPerformanceEditDialogHeader id={id} />
      <TIPPerformanceEditForm
        saveTIPPerformance={saveTIPPerformance}
        actionsLoading={actionsLoading}
        tipPerformance={tipPerformanceForEdit || tipPerformancesUIProps.initTIPPerformance}
        onHide={onHide}
      />
    </Modal>
  );
}
