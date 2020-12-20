import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/NonTipPerformances/NonTipPerformancesActions";
import { NonTipPerformanceEditDialogHeader } from "./NonTipPerformanceEditDialogHeader";
import { NonTipPerformanceEditForm } from "./NonTipPerformanceEditForm";
import { useNonTipPerformancesUIContext } from "../NonTipPerformancesUIContext";

export function NonTipPerformanceEditDialog({ id, show, onHide }) {
  // NonTipPerformances UI Context
  const nonTipPerformancesUIContext = useNonTipPerformancesUIContext();
  const nonTipPerformancesUIProps = useMemo(() => {
    return {
      initNonTipPerformance: nonTipPerformancesUIContext.initNonTipPerformance,
    };
  }, [nonTipPerformancesUIContext]);

  // NonTipPerformances Redux state
  const dispatch = useDispatch();
  const { actionsLoading, nonTipPerformanceForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.nonTipPerformances.actionsLoading,
      nonTipPerformanceForEdit: state.nonTipPerformances.nonTipPerformanceForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting NonTipPerformance by id
    dispatch(actions.fetchNonTipPerformance(id));
  }, [id, dispatch]);

  // server request for saving nonTipPerformance
  const saveNonTipPerformance = (nonTipPerformance) => {
    if (!id) {
      // server request for creating nonTipPerformance
      dispatch(actions.createNonTipPerformance(nonTipPerformance)).then(() => onHide());
    } else {
      // server request for updating nonTipPerformance
      dispatch(actions.updateNonTipPerformance(nonTipPerformance)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <NonTipPerformanceEditDialogHeader id={id} />
      <NonTipPerformanceEditForm
        saveNonTipPerformance={saveNonTipPerformance}
        actionsLoading={actionsLoading}
        nonTipPerformance={nonTipPerformanceForEdit || nonTipPerformancesUIProps.initNonTipPerformance}
        onHide={onHide}
      />
    </Modal>
  );
}
