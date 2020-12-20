// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ftiLibs/ftiLibsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../FtiLibsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useFtiLibsUIContext } from "../FtiLibsUIContext";

export function FtiLibsTable() {
  // FtiLibs UI Context
  const ftiLibsUIContext = useFtiLibsUIContext();
  const ftiLibsUIProps = useMemo(() => {
    return {
      ids: ftiLibsUIContext.ids,
      setIds: ftiLibsUIContext.setIds,
      queryParams: ftiLibsUIContext.queryParams,
      setQueryParams: ftiLibsUIContext.setQueryParams,
      openEditFtiLibDialog: ftiLibsUIContext.openEditFtiLibDialog,
      openDeleteFtiLibDialog: ftiLibsUIContext.openDeleteFtiLibDialog,
    };
  }, [ftiLibsUIContext]);

  // Getting curret state of ftiLibs list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.ftiLibs }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;


  const { currentUser } = useSelector(
    (state) => ({ 
                  currentUser: state.auth.user}),
    shallowEqual
  );


  // FtiLibs Redux state
  const dispatch = useDispatch();

  const fileFormatter = (cell, obj) => {
    return <a target="_blank" rel="noopener noreferrer" href={`http://localhost:4000/files/${cell}`}> <img src={`http://localhost:4000/files/${cell}`} alt="..." width="100px" height="100px" /> </a>
  }

  const catFormatter = (cell,row) =>{
    if(cell === "0")
    {
      return "Kabin"
    }
    else if(cell === "1")
    {
      return "UçakAltı"
    }
  }
   const subCatFormatter = (cell,row) =>{
     if(row.catId === "0")
     {

        if(cell === "0")
        {
          return "IED"
        }
        else if(cell === "1")
        {
          return "Silah"
        }
        else if(cell === "2")
        {
          return "Knives"
        }
        else if(cell === "3")
        {
          return "Other"
        }

     }
     else{ //"1"
        if(cell === "0")
        {
          return "IED"
        }
        else if(cell === "1")
        {
          return "Other"
        }


     }
  
  }
  useEffect(() => {
    // clear selections list
    ftiLibsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchFtiLibs(ftiLibsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ftiLibsUIProps.queryParams, dispatch]);
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
      dataField: "catId",
      text: "Kategori",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: catFormatter,
    },
    {
      dataField: "subCatId",
      text: "Alt Kategori",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: subCatFormatter,
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
        openEditFtiLibDialog: ftiLibsUIProps.openEditFtiLibDialog,
        openDeleteFtiLibDialog: ftiLibsUIProps.openDeleteFtiLibDialog,
        user:currentUser,
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
    sizePerPage: ftiLibsUIProps.queryParams.pageSize,
    page: ftiLibsUIProps.queryParams.pageNumber,
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
                  ftiLibsUIProps.setQueryParams
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
