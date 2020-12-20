import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/NonTipPerformances/NonTipPerformancesActions";
import { useNonTipPerformancesUIContext } from "../NonTipPerformancesUIContext";
import { useIntl } from "react-intl";
export function NonTipPerformanceDeleteDialog({ id, show, onHide }) {

  const intl = useIntl();
  // NonTipPerformances UI Context
  const nonTipPerformancesUIContext = useNonTipPerformancesUIContext();
  const nonTipPerformancesUIProps = useMemo(() => {
    return {
      setIds: nonTipPerformancesUIContext.setIds,
      queryParams: nonTipPerformancesUIContext.queryParams
    };
  }, [nonTipPerformancesUIContext]);

  // NonTipPerformances Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.nonTipPerformances.actionsLoading }),
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

  const deleteNonTipPerformance = () => {
    // server request for deleting nonTipPerformance by id
    dispatch(actions.deleteNonTipPerformance(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchNonTipPerformances(nonTipPerformancesUIProps.queryParams));
      // clear selections list
      nonTipPerformancesUIProps.setIds([]);
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

          {intl.formatMessage({ id: "MENU.NONTIPPERFORMANCES.DEL" })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span> {intl.formatMessage({ id: "MENU.NONTIPPERFORMANCES.DELETE_MSG" })}</span>
        )}

        {isLoading && <span>{intl.formatMessage({ id: "MENU.NONTIPPERFORMANCES.DELETING" })}</span>}
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
            onClick={deleteNonTipPerformance}
            className="btn btn-primary btn-elevate"
          >
            {intl.formatMessage({ id: "MENU.DELETE" })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
