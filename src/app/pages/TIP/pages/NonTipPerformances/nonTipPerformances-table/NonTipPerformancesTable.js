// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/NonTipPerformances/NonTipPerformancesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../NonTipPerformancesUIHelpers";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useNonTipPerformancesUIContext } from "../NonTipPerformancesUIContext";

export function NonTipPerformancesTable() {
  // NonTipPerformances UI Context
  const nonTipPerformancesUIContext = useNonTipPerformancesUIContext();
  const nonTipPerformancesUIProps = useMemo(() => {
    return {
      ids: nonTipPerformancesUIContext.ids,
      setIds: nonTipPerformancesUIContext.setIds,
      queryParams: nonTipPerformancesUIContext.queryParams,
      setQueryParams: nonTipPerformancesUIContext.setQueryParams,
      openEditNonTipPerformanceDialog: nonTipPerformancesUIContext.openEditNonTipPerformanceDialog,
      openDeleteNonTipPerformanceDialog: nonTipPerformancesUIContext.openDeleteNonTipPerformanceDialog,
    };
  }, [nonTipPerformancesUIContext]);

  // Getting curret state of nonTipPerformances list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.nonTipPerformances }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // NonTipPerformances Redux state
  const dispatch = useDispatch();

  
  useEffect(() => {
    // clear selections list
    nonTipPerformancesUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchNonTipPerformances(nonTipPerformancesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonTipPerformancesUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "TipAdi",
      text: "TIP Adı",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "DosyaAdi",
      text: "Dosya Adı",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "Kategori",
      text: "Kategori",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "GosterilenTipSayisi",
      text: "Gösterilen TIP Sayısı",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "IsabetSayisi",
      text: "İsabet Sayısı",
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: "IptalSayisi",
      text: "İptal Sayısı",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "KacirildiSayisi",
      text: "Kaçırıldı Sayısı",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "IsabetOrani",
      text: "İsabet Oranı",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "IptalOrani",
      text: "İptal Oranı",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "KacirildiOrani",
      text: "Kaçırıldı Oranı",
      sort: true,
      sortCaret: sortCaret,
    }
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: nonTipPerformancesUIProps.queryParams.pageSize,
    page: nonTipPerformancesUIProps.queryParams.pageNumber,
  };

  const rowStyleFormat = (row, index) => {
    let oran = row.IsabetOrani
    oran = oran.replace(",",".")
    return { backgroundColor: parseFloat(oran) <=0.25 ? 'yellow' : '' };
  }

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
              rowStyle={rowStyleFormat}
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
                  nonTipPerformancesUIProps.setQueryParams
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
