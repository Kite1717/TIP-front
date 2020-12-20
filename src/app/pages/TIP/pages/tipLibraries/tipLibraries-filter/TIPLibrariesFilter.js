import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useTIPLibrariesUIContext } from "../TIPLibrariesUIContext";
import { useIntl } from "react-intl";
import{Button} from 'react-bootstrap'

const prepareFilter = (queryParams, values) => {
  const {  code } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
 

  filter.code =  code !== "" ? code : null
  
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function TIPLibrariesFilter({ listLoading }) {
  // TIPLibraries UI Context
  const tipLibrariesUIContext = useTIPLibrariesUIContext();
  const tipLibrariesUIProps = useMemo(() => {
    return {
      queryParams: tipLibrariesUIContext.queryParams,
      setQueryParams: tipLibrariesUIContext.setQueryParams,
    };
  }, [tipLibrariesUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(tipLibrariesUIProps.queryParams, values);
    if (!isEqual(newQueryParams, tipLibrariesUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      tipLibrariesUIProps.setQueryParams(newQueryParams);
    }
  };
 const intl = useIntl();
  return (
    <>
      <Formik
        initialValues={{
        
          code: "",
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
                  <input
                    type="text"
                    className="form-control"
                    name="code"
                    placeholder="Ara"
                    onBlur={handleBlur}
                    value={values.code}
                    onChange={(e) => {
                      setFieldValue("code", e.target.value);
                    }}
                  />
                  <small className="form-text text-muted">
                      {intl.formatMessage({ id: "MENU.FILTER_BY_CODE" })}
                </small>
                </div>

                <div className="col-lg-1">
                 <Button onClick = {handleSubmit} variant = "success">{intl.formatMessage({ id: "MENU.FILTER" })}</Button>
                  
                </div>
                <div className="col-lg-1">
                 <Button onClick  = {()=>{
                    setFieldValue("code","")
                    handleSubmit()

                 }} variant = "danger">{intl.formatMessage({ id: "MENU.CLEAN" })}</Button>
                </div>
              </div>
            </form>
          )}
      </Formik>
    </>
  );
}
