import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/individualReports/individualReportsActions";
import { useIndividualReportsUIContext } from "../IndividualReportsUIContext";
import { useIntl } from "react-intl";
export function IndividualReportDeleteDialog({ id, show, onHide }) {

  const intl = useIntl();
  // IndividualReports UI Context
  const individualReportsUIContext = useIndividualReportsUIContext();
  const individualReportsUIProps = useMemo(() => {
    return {
      setIds: individualReportsUIContext.setIds,
      queryParams: individualReportsUIContext.queryParams
    };
  }, [individualReportsUIContext]);

  // IndividualReports Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.individualReports.actionsLoading }),
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

  const deleteIndividualReport = () => {
    // server request for deleting individualReport by id
    dispatch(actions.deleteIndividualReport(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchIndividualReports(individualReportsUIProps.queryParams));
      // clear selections list
      individualReportsUIProps.setIds([]);
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
       
        {intl.formatMessage({ id: "MENU.INDIVIDUALREPORTSS.DEL" })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span> {intl.formatMessage({ id: "MENU.INDIVIDUALREPORTSS.DELETE_MSG" })}</span>
        )}
       
        {isLoading && <span>{intl.formatMessage({ id: "MENU.INDIVIDUALREPORTSS.DELETING" })}</span>}
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
            onClick={deleteIndividualReport}
            className="btn btn-primary btn-elevate"
          >
           {intl.formatMessage({ id: "MENU.DELETE" })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
