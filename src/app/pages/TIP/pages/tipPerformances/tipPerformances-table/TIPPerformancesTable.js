// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/tipPerformances/tipPerformancesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../TIPPerformancesUIHelpers";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useTIPPerformancesUIContext } from "../TIPPerformancesUIContext";

export function TIPPerformancesTable() {
  // TIPPerformances UI Context
  const tipPerformancesUIContext = useTIPPerformancesUIContext();
  const tipPerformancesUIProps = useMemo(() => {
    return {
      ids: tipPerformancesUIContext.ids,
      setIds: tipPerformancesUIContext.setIds,
      queryParams: tipPerformancesUIContext.queryParams,
      setQueryParams: tipPerformancesUIContext.setQueryParams,
      openEditTIPPerformanceDialog: tipPerformancesUIContext.openEditTIPPerformanceDialog,
      openDeleteTIPPerformanceDialog: tipPerformancesUIContext.openDeleteTIPPerformanceDialog,
    };
  }, [tipPerformancesUIContext]);

  // Getting curret state of tipPerformances list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.tipPerformances }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // TIPPerformances Redux state
  const dispatch = useDispatch();

  useEffect(() => {
    // clear selections list
    tipPerformancesUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchTIPPerformances(tipPerformancesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipPerformancesUIProps.queryParams, dispatch]);
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
    sizePerPage: tipPerformancesUIProps.queryParams.pageSize,
    page: tipPerformancesUIProps.queryParams.pageNumber,
  };

  const rowStyleFormat = (row, index) => {
    let oran = row.IsabetOrani
    oran = oran.replace(",",".")
    return { backgroundColor: parseFloat(oran) >=0.75 ? 'yellow' : '' };
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
                  tipPerformancesUIProps.setQueryParams
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
