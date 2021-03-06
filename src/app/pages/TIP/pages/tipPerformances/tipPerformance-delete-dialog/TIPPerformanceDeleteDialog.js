import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/tipPerformances/tipPerformancesActions";
import { useTIPPerformancesUIContext } from "../TIPPerformancesUIContext";
import { useIntl } from "react-intl";
export function TIPPerformanceDeleteDialog({ id, show, onHide }) {

  const intl = useIntl();
  // TIPPerformances UI Context
  const tipPerformancesUIContext = useTIPPerformancesUIContext();
  const tipPerformancesUIProps = useMemo(() => {
    return {
      setIds: tipPerformancesUIContext.setIds,
      queryParams: tipPerformancesUIContext.queryParams
    };
  }, [tipPerformancesUIContext]);

  // TIPPerformances Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.tipPerformances.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => { }, [isLoading, dispatch]);

  const deleteTIPPerformance = () => {
    // server request for deleting tipPerformance by id
    dispatch(actions.deleteTIPPerformance(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchTIPPerformances(tipPerformancesUIProps.queryParams));
      // clear selections list
      tipPerformancesUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">

          {intl.formatMessage({ id: "MENU.TIPPERFORMANCES.DEL" })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span> {intl.formatMessage({ id: "MENU.TIPPERFORMANCES.DELETE_MSG" })}</span>
        )}

        {isLoading && <span>{intl.formatMessage({ id: "MENU.TIPPERFORMANCES.DELETING" })}</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            {intl.formatMessage({ id: "MENU.CANCEL" })}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteTIPPerformance}
            className="btn btn-primary btn-elevate"
          >
            {intl.formatMessage({ id: "MENU.DELETE" })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
