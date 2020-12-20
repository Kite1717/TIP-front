import React, { useEffect } from "react";
import { Modal, Tabs, Tab, TabContent } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/users/usersActions";
import { useIntl } from "react-intl";
import { MonthlyIndvResult } from './MonthlyIndvResult'
import { TIPReactionTime } from "./TIPReactionTime";
import { IORecords } from "./IORecords";
import { ShiftRecords } from "./ShiftRecords";
export function UserStatusDialog({ id, show, onHide }) {

  const intl = useIntl();
  // Users UI Context
  
  

  // Users Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.users.actionsLoading }),
    shallowEqual
  );

  const { userForEdit, monhtlyInfoSelectedUser, individualInfoSelectedUser, ioRecords } = useSelector(
    (state) => ({
      actionsLoading: state.users.actionsLoading,
      userForEdit: state.users.userForEdit,

      monhtlyInfoSelectedUser: state.users.monhtlyInfoSelectedUser,
      monthlyTotalCount: state.users.monthlyTotalCount,

      individualInfoSelectedUser: state.users.individualInfoSelectedUser,
      invidualTotalCount: state.users.invidualTotalCount,

      ioRecords: state.users.ioRecords,
      ioTotalCount: state.users.ioTotalCount,




    }),
    shallowEqual
  );



  useEffect(() => {

    // server call for getting User by id
    if (id !== undefined && id !== null && userForEdit !== null && userForEdit !== undefined) {
      dispatch(actions.fetchUserMonthlyReport(userForEdit.deviceIdNo));
      dispatch(actions.fetchUserIndividualReport(userForEdit.deviceIdNo));
      dispatch(actions.fetchUserIORecords(userForEdit.deviceIdNo));


    }


  }, [id, userForEdit,dispatch]);





  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    else {
      dispatch(actions.fetchUser(id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (id && show)
      dispatch(actions.fetchUser(id))

  }, [show, id,dispatch]);





  return (
    <Modal
      size="xl"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {
            userForEdit &&
            userForEdit.fullName + " Sonuçlar"
          }
          
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
          <Tab eventKey="home" title="Aylık Bireysel Sonuçlar">
            <TabContent>
              <MonthlyIndvResult data={monhtlyInfoSelectedUser} />
            </TabContent>
          </Tab>
          <Tab eventKey="profile" title="TIP Reaksiyon Süreleri">
            <TIPReactionTime data={individualInfoSelectedUser} />
          </Tab>
          <Tab eventKey="contact" title="Giriş/Çıkış Kayıtları">
            <IORecords data={ioRecords} />
          </Tab>
          <Tab eventKey="vardiya" title="Vardiya Kayıtları">
            <ShiftRecords data={ioRecords} />
          </Tab>
        </Tabs>
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
        </div>
      </Modal.Footer>
    </Modal>
  );
}
