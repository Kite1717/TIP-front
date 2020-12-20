import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/ftiLibs/ftiLibsActions";
import { useFtiLibsUIContext } from "../FtiLibsUIContext";
import { useIntl } from "react-intl";
export function FtiLibDeleteDialog({ id, show, onHide }) {

  const intl = useIntl();
  // FtiLibs UI Context
  const ftiLibsUIContext = useFtiLibsUIContext();
  const ftiLibsUIProps = useMemo(() => {
    return {
      setIds: ftiLibsUIContext.setIds,
      queryParams: ftiLibsUIContext.queryParams
    };
  }, [ftiLibsUIContext]);

  // FtiLibs Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.ftiLibs.actionsLoading }),
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

  const deleteFtiLib = () => {
    // server request for deleting ftiLib by id
    dispatch(actions.deleteFtiLib(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchFtiLibs(ftiLibsUIProps.queryParams));
      // clear selections list
      ftiLibsUIProps.setIds([]);
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
       
        {intl.formatMessage({ id: "MENU.FTI_LIBS.DEL" })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span> {intl.formatMessage({ id: "MENU.FTI_LIBS.DELETE_MSG" })}</span>
        )}
       
        {isLoading && <span>{intl.formatMessage({ id: "MENU.FTI_LIBS.DELETING" })}</span>}
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
            onClick={deleteFtiLib}
            className="btn btn-primary btn-elevate"
          >
           {intl.formatMessage({ id: "MENU.DELETE" })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
