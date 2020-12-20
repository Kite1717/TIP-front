import React, { useEffect } from "react";
import { Modal, Tabs, Tab, TabContent } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/individualReports/individualReportsActions";
import { useIntl } from "react-intl";
import { MonthlyIndvResult } from './MonthlyIndvResult'
import { TIPReactionTime } from "./TIPReactionTime";
import { IORecords } from "./IORecords";
import { ShiftRecords } from "./ShiftRecords";
export function IndividualReportStatusDialog({ id, show, onHide }) {

  const intl = useIntl();
  // IndividualReports UI Context
  
  

  // IndividualReports Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.individualReports.actionsLoading }),
    shallowEqual
  );

  const { individualReportForEdit, monhtlyInfoSelectedIndividualReport, individualInfoSelectedIndividualReport, ioRecords } = useSelector(
    (state) => ({
      actionsLoading: state.individualReports.actionsLoading,
      individualReportForEdit: state.individualReports.individualReportForEdit,

      monhtlyInfoSelectedIndividualReport: state.individualReports.monhtlyInfoSelectedIndividualReport,
      monthlyTotalCount: state.individualReports.monthlyTotalCount,

      individualInfoSelectedIndividualReport: state.individualReports.individualInfoSelectedIndividualReport,
      invidualTotalCount: state.individualReports.invidualTotalCount,

      ioRecords: state.individualReports.ioRecords,
      ioTotalCount: state.individualReports.ioTotalCount,




    }),
    shallowEqual
  );



  useEffect(() => {

    // server call for getting IndividualReport by id
    if (id !== undefined && id !== null && individualReportForEdit !== null && individualReportForEdit !== undefined) {
      dispatch(actions.fetchIndividualReportMonthlyReport(individualReportForEdit.deviceIdNo));
      dispatch(actions.fetchIndividualReportIndividualReport(individualReportForEdit.deviceIdNo));
      dispatch(actions.fetchIndividualReportIORecords(individualReportForEdit.deviceIdNo));


    }


  }, [id, individualReportForEdit,dispatch]);





  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    else {
      dispatch(actions.fetchIndividualReport(id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (id && show)
      dispatch(actions.fetchIndividualReport(id))

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
          Sonuçlar
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
          <Tab eventKey="home" title="Aylık Bireysel Sonuçlar">
            <TabContent>
              <MonthlyIndvResult data={monhtlyInfoSelectedIndividualReport} />
            </TabContent>
          </Tab>
          <Tab eventKey="profile" title="TIP Reaksiyon Süreleri">
            <TIPReactionTime data={individualInfoSelectedIndividualReport} />
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
