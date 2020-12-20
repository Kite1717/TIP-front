// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/tipLibraries/tipLibrariesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../TIPLibrariesUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useTIPLibrariesUIContext } from "../TIPLibrariesUIContext";

export function TIPLibrariesTable() {
  // TIPLibraries UI Context
  const tipLibrariesUIContext = useTIPLibrariesUIContext();
  const tipLibrariesUIProps = useMemo(() => {
    return {
      ids: tipLibrariesUIContext.ids,
      setIds: tipLibrariesUIContext.setIds,
      queryParams: tipLibrariesUIContext.queryParams,
      setQueryParams: tipLibrariesUIContext.setQueryParams,
      openEditTIPLibraryDialog: tipLibrariesUIContext.openEditTIPLibraryDialog,
      openDeleteTIPLibraryDialog: tipLibrariesUIContext.openDeleteTIPLibraryDialog,
    };
  }, [tipLibrariesUIContext]);

  // Getting curret state of tipLibraries list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.tipLibraries }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  
  const { currentUser } = useSelector(
    (state) => ({ 
                  currentUser: state.auth.user}),
    shallowEqual
  );


  // TIPLibraries Redux state
  const dispatch = useDispatch();

  const fileFormatter = (cell, obj) => {
    return <a target="_blank" rel="noopener noreferrer" href={`http://localhost:4000/files/${cell}`}> <img src={`http://localhost:4000/files/${cell}`} alt="..." width="100px" height="100px" /> </a>
  }
  useEffect(() => {
    // clear selections list
    tipLibrariesUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchTIPLibraries(tipLibrariesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipLibrariesUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "code",
      text: "Görüntü Kodu",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "file",
      text: "Görüntüle / İndir",
      sort: true,
      sortCaret: sortCaret,
      formatter: fileFormatter,
    },
    {
      dataField: "action",
      text: "İşlemler",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openDeleteTIPLibraryDialog: tipLibrariesUIProps.openDeleteTIPLibraryDialog,
        user: currentUser,
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
    sizePerPage: tipLibrariesUIProps.queryParams.pageSize,
    page: tipLibrariesUIProps.queryParams.pageNumber,
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
                  tipLibrariesUIProps.setQueryParams
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
