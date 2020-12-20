// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/individualReports/individualReportsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../IndividualReportsUIHelpers";
// import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useIndividualReportsUIContext } from "../IndividualReportsUIContext";

export function IndividualReportsTable() {
  // IndividualReports UI Context
  const individualReportsUIContext = useIndividualReportsUIContext();
  const individualReportsUIProps = useMemo(() => {
    return {
      ids: individualReportsUIContext.ids,
      setIds: individualReportsUIContext.setIds,
      queryParams: individualReportsUIContext.queryParams,
      setQueryParams: individualReportsUIContext.setQueryParams,
      openEditIndividualReportDialog: individualReportsUIContext.openEditIndividualReportDialog,
      openDeleteIndividualReportDialog: individualReportsUIContext.openDeleteIndividualReportDialog,
      openStatusIndividualReportDialog : individualReportsUIContext.openStatusIndividualReportDialog
    };
  }, [individualReportsUIContext]);

  // Getting curret state of individualReports list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.individualReports }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // IndividualReports Redux state
  const dispatch = useDispatch();

  useEffect(() => {
    // clear selections list
    individualReportsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchIndividualReports(individualReportsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [individualReportsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "CihazKimlikNo",
      text: "Cihaz Kimlik No",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "Soyadı",
      text: "Soyadı",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "YanlisAlarmSuresi",
      text: "Yanlış Alarm Süresi",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "IsabetSuresi",
      text: "İsabet Süresi",
      sort: false,
      sortCaret: sortCaret,
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: individualReportsUIProps.queryParams.pageSize,
    page: individualReportsUIProps.queryParams.pageNumber,
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
                  individualReportsUIProps.setQueryParams
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
