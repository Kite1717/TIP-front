import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/systemInformations/systemInformationsActions";
import { useSystemInformationsUIContext } from "../SystemInformationsUIContext";
import { useIntl } from "react-intl";
export function SystemInformationDeleteDialog({ id, show, onHide }) {

  const intl = useIntl();
  // SystemInformations UI Context
  const systemInformationsUIContext = useSystemInformationsUIContext();
  const systemInformationsUIProps = useMemo(() => {
    return {
      setIds: systemInformationsUIContext.setIds,
      queryParams: systemInformationsUIContext.queryParams
    };
  }, [systemInformationsUIContext]);

  // SystemInformations Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.systemInformations.actionsLoading }),
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

  const deleteSystemInformation = () => {
    // server request for deleting systemInformation by id
    dispatch(actions.deleteSystemInformation(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchSystemInformations(systemInformationsUIProps.queryParams));
      // clear selections list
      systemInformationsUIProps.setIds([]);
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

          {intl.formatMessage({ id: "MENU.SYSTEMINFORMATIONS.DEL" })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span> {intl.formatMessage({ id: "MENU.SYSTEMINFORMATIONS.DELETE_MSG" })}</span>
        )}

        {isLoading && <span>{intl.formatMessage({ id: "MENU.SYSTEMINFORMATIONS.DELETING" })}</span>}
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
            onClick={deleteSystemInformation}
            className="btn btn-primary btn-elevate"
          >
            {intl.formatMessage({ id: "MENU.DELETE" })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
