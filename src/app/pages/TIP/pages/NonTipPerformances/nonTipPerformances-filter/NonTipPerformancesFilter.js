import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useNonTipPerformancesUIContext } from "../NonTipPerformancesUIContext";
import { useIntl } from "react-intl";

import { Button } from 'react-bootstrap'
import { Select } from "../../../../../../_metronic/_partials/controls";
const prepareFilter = (queryParams, values) => {
  const { status, type, TipAdi, Kategori } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by status
  filter.status = status !== "" ? +status : undefined;
  // Filter by type
  filter.type = type !== "" ? +type : undefined;
  // Filter by all fields

  filter.TipAdi = TipAdi !== "" ? TipAdi : null
  filter.Kategori = Kategori !== "" ? Kategori : null


  newQueryParams.filter = filter;
  return newQueryParams;
};

export function NonTipPerformancesFilter({ listLoading }) {
  // NonTipPerformances UI Context
  const nonTipPerformancesUIContext = useNonTipPerformancesUIContext();
  const nonTipPerformancesUIProps = useMemo(() => {
    return {
      queryParams: nonTipPerformancesUIContext.queryParams,
      setQueryParams: nonTipPerformancesUIContext.setQueryParams,
    };
  }, [nonTipPerformancesUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {

    const newQueryParams = prepareFilter(nonTipPerformancesUIProps.queryParams, values);
    if (!isEqual(newQueryParams, nonTipPerformancesUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      nonTipPerformancesUIProps.setQueryParams(newQueryParams);
    }
  };
  const intl = useIntl()

  return (
    <>
      <Formik
        initialValues={{
          status: "", // values => All=""/Susspended=0/Active=1/Pending=2
          type: "", // values => All=""/Business=0/Individual=1
          Kategori: "",
          TipAdi: "",
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
            <form onSubmit={handleSubmit} className="form form-label-right">
              <div className="form-group row">

                <div className="col-lg-2">
                <Select name="Kategori">
                    <option value="All">Hepsi</option>
                      <option value="Bombs">Bombs</option>
                      <option value="Knife">Knife</option>
                      <option value="Guns">Guns</option>
                      <option value="Others">Others</option>
                    </Select>

                    <small className="form-text text-muted">
                    Kategoriye Göre Fitrele
                  </small>
                </div>

                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    name="TipAdi"
                    placeholder={intl.formatMessage({ id: "MENU.SEARCH" })}
                    onBlur={handleBlur}
                    value={values.TipAdi}
                    onChange={(e) => {
                      setFieldValue("TipAdi", e.target.value);

                    }}

                  />

                  <small className="form-text text-muted">
                    {intl.formatMessage({ id: "MENU.TIPPERFORMANCES.FILTER_BY_TIP_NAME" })}
                  </small>
                </div>

                <div className="col-lg-1">
                  <Button onClick={handleSubmit} variant="success">{intl.formatMessage({ id: "MENU.FILTER" })}</Button>
                </div>
                <div className="col-lg-1">
                  <Button onClick={() => {
                    setFieldValue("Kategori", "All")
                    setFieldValue("TipAdi", "")
                    handleSubmit()

                  }} variant="danger">{intl.formatMessage({ id: "MENU.CLEAN" })}</Button>
                </div>
              </div>
            </form>
          )}
      </Formik>
    </>
  );
}
