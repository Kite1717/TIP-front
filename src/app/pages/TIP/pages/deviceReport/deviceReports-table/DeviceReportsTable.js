// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/deviceReports/deviceReportsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../DeviceReportsUIHelpers";
// import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useDeviceReportsUIContext } from "../DeviceReportsUIContext";

export function DeviceReportsTable() {
  // DeviceReports UI Context
  const deviceReportsUIContext = useDeviceReportsUIContext();
  const deviceReportsUIProps = useMemo(() => {
    return {
      ids: deviceReportsUIContext.ids,
      setIds: deviceReportsUIContext.setIds,
      queryParams: deviceReportsUIContext.queryParams,
      setQueryParams: deviceReportsUIContext.setQueryParams,
      openEditDeviceReportDialog: deviceReportsUIContext.openEditDeviceReportDialog,
      openDeleteDeviceReportDialog: deviceReportsUIContext.openDeleteDeviceReportDialog,
      openStatusDeviceReportDialog : deviceReportsUIContext.openStatusDeviceReportDialog
    };
  }, [deviceReportsUIContext]);

  // Getting curret state of deviceReports list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.deviceReports }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // DeviceReports Redux state
  const dispatch = useDispatch();

  const roleFormatter =(cell,obj)=>{
    if(cell === 0){
      return "Admin";
    }else if(cell === 1){
      return "Eğitmen"
    }else if(cell === 2){
      return "Şirket Yöneticisi"
    }
    
  }
  useEffect(() => {
    // clear selections list
    deviceReportsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchDeviceReports(deviceReportsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceReportsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "fullName",
      text: "Ad Soyad",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "role",
      text: "Rol",
      sort: true,
      sortCaret: sortCaret,
      formatter : roleFormatter,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "phoneNumber",
      text: "Telefon Numarası",
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: "tcNo",
      text: "TC Numarası",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "deviceIdNo",
      text: "Cihaz Id",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "address",
      text: "Adres",
      sort: true,
      sortCaret: sortCaret,
    }
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: deviceReportsUIProps.queryParams.pageSize,
    page: deviceReportsUIProps.queryParams.pageNumber,
  };
  return (
    <>
      {
        entities && entities.length > 0 &&
        <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  deviceReportsUIProps.setQueryParams
                )}
              
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>}
    </>
  );
}
