import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useDeviceReportsUIContext } from "../DeviceReportsUIContext";
import { useIntl } from "react-intl";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'

import{Button} from 'react-bootstrap'
const prepareFilter = (queryParams, values) => {
  const { status, type, MakineSeriNo, } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by status
  filter.status = status !== "" ? +status : undefined;
  // Filter by type
  filter.type = type !== "" ? +type : undefined;
  // Filter by all fields
 
   filter.MakineSeriNo = MakineSeriNo
 

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function DeviceReportsFilter({ listLoading }) {
  // DeviceReports UI Context
  const deviceReportsUIContext = useDeviceReportsUIContext();
  const deviceReportsUIProps = useMemo(() => {
    return {
      queryParams: deviceReportsUIContext.queryParams,
      setQueryParams: deviceReportsUIContext.setQueryParams,
    };
  }, [deviceReportsUIContext]);


  const { currentState,currentUser } = useSelector(
    (state) => ({ currentState: state.users ,
                  currentUser: state.auth.user.user}),
    shallowEqual
  );

  // queryParams, setQueryParams,
  const applyFilter = (values) => {

    if(currentUser !== null && currentUser !== undefined &&  (currentUser.isTipAdmin  || currentUser.role === 1  ))
    {
      const newQueryParams = prepareFilter(deviceReportsUIProps.queryParams, values);
      if (!isEqual(newQueryParams, deviceReportsUIProps.queryParams)) {
        newQueryParams.pageNumber = 1;
        // update list by queryParams
        deviceReportsUIProps.setQueryParams(newQueryParams);
      }
    }
    else{
    
Swal.fire({
  icon: 'error',
  title: 'Dikkat!!',
  text: 'Bu bilgilere eişiminiz bulunamamaktadır.',

})
    }
  
  };
  const intl = useIntl()

  return (
    <>
      <Formik
        initialValues={{
          status: "", // values => All=""/Susspended=0/Active=1/Pending=2
          type: "", // values => All=""/Business=0/Individual=1
          MakineSeriNo: "",
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
                    name="MakineSeriNo"
                    placeholder=  "Makine Seri No"
                    onBlur={handleBlur}
                    value={values.MakineSeriNo}
                    onChange={(e) => {
                      setFieldValue("MakineSeriNo", e.target.value);
                    }}

                  />
                
                  <small className="form-text text-muted">
                  Lütfen aramak istediğiniz cihaz seri numarasını girin...
                </small>
                </div>

                <div className="col-lg-1">
                 <Button onClick = {handleSubmit} variant = "success">{intl.formatMessage({ id: "MENU.SEARCH" })}</Button>
                </div>
                <div className="col-lg-1">
                 <Button onClick  = {()=>{
                    setFieldValue("MakineSeriNo","")
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
