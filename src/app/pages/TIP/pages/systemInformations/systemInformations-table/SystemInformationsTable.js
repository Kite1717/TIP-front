// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/systemInformations/systemInformationsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../SystemInformationsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useSystemInformationsUIContext } from "../SystemInformationsUIContext";

export function SystemInformationsTable({isTipAdmin}) {

  
  // SystemInformations UI Context
  const systemInformationsUIContext = useSystemInformationsUIContext();
  const systemInformationsUIProps = useMemo(() => {
    return {
      ids: systemInformationsUIContext.ids,
      setIds: systemInformationsUIContext.setIds,
      queryParams: systemInformationsUIContext.queryParams,
      setQueryParams: systemInformationsUIContext.setQueryParams,
      openEditSystemInformationDialog: systemInformationsUIContext.openEditSystemInformationDialog,
      openDeleteSystemInformationDialog: systemInformationsUIContext.openDeleteSystemInformationDialog,
    };
  }, [systemInformationsUIContext]);

  // Getting curret state of systemInformations list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.systemInformations }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // SystemInformations Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    systemInformationsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchSystemInformations(systemInformationsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemInformationsUIProps.queryParams, dispatch]);
  // Table columns

  const modeFormatter = (cell,obj) => {
    if(cell){
      return "Açık"
    }else{
      return "Kapalı"
    }
  }


  const columns = [
    {
      dataField: "tipSoftwareVersions",
      text: "TIP Yazılım Versiyonları",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "softwareTechnicalFeatures",
      text: "Yazılım Teknik Özellikleri",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "standAloneMode",
      text: "Stand-Alone Mode",
      sort: true,
      sortCaret: sortCaret,
      formatter: modeFormatter,
    },
    {
      dataField: "networkMode",
      text: "Network Mode",
      sort: false,
      sortCaret: sortCaret,
      formatter: modeFormatter,
    },
    {
      dataField: "xRayDevices",
      text: "X-Ray Cihazları",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: "İşlemler",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditSystemInformationDialog: systemInformationsUIProps.openEditSystemInformationDialog,
        openDeleteSystemInformationDialog: systemInformationsUIProps.openDeleteSystemInformationDialog,
        isTipAdmin ,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: systemInformationsUIProps.queryParams.pageSize,
    page: systemInformationsUIProps.queryParams.pageNumber,
  };
  return (
    <>
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
                  systemInformationsUIProps.setQueryParams
                )}
               
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
