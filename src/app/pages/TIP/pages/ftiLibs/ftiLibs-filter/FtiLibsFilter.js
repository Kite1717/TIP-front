import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useFtiLibsUIContext } from "../FtiLibsUIContext";
import { useIntl } from "react-intl";

import{Button} from 'react-bootstrap'
const prepareFilter = (queryParams, values,reset) => {
  const { status, type, code,catId,subCatId } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by status
  filter.status = status !== "" ? +status : undefined;
  // Filter by type
  filter.type = type !== "" ? +type : undefined;
  // Filter by all fields
 
 if(!reset)
 {  
   filter.code = code !== "" ? code : null
   filter.catId = catId !== "" ? catId : null
   filter.subCatId = subCatId !== "" ? subCatId : null

 }

 

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function FtiLibsFilter({ listLoading }) {
  // FtiLibs UI Context
  const ftiLibsUIContext = useFtiLibsUIContext();
  const ftiLibsUIProps = useMemo(() => {
    return {
      queryParams: ftiLibsUIContext.queryParams,
      setQueryParams: ftiLibsUIContext.setQueryParams,
    };
  }, [ftiLibsUIContext]);


  const intl = useIntl()

  const[catId,setCatId] = React.useState("0")
 const[subCatId,setSubCatId] = React.useState("0")
 const[reset,setReset] = React.useState(false)

   const subOptionRender = ()=>{

  if(catId === "0") //Kabin
  {
    return(
      <>
       <option value="0">IED</option>
      <option value="1">Silah</option>
      <option value="2">Knives</option>
      <option value="3">Other</option>
      </>
     
    )
  }
  if(catId === "1") //UçakAltı
  {
    return(
      <>
      <option value="0">IED</option>
      <option value="1">Other</option>
      </>
    )
  }
 }

 const handleChange = (e) =>{

  if(e.target.name === "catId")
  {
    setCatId(e.target.value)
    setSubCatId("0")
  }
  
  else{
    setSubCatId(e.target.value)
  }
 }


  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    values.catId = catId
    values.subCatId = subCatId
    const newQueryParams = prepareFilter(ftiLibsUIProps.queryParams, values,reset);
    if (!isEqual(newQueryParams, ftiLibsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      ftiLibsUIProps.setQueryParams(newQueryParams);
    }

    setReset(false)
  };
  return (
    <>
      <Formik
        initialValues={{
        
          code  : "",
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
        
          setFieldValue,
        }) => (
            <form onSubmit={handleSubmit} className="form form-label-right">
              <div className="form-group row">
              
               <div className="col-lg-2">
                  
                  <select
                    className="form-control"
                    name="catId"
                    onChange={(e) => {
                      
                      handleChange(e)
                    
                    }}
                    value={catId}
                  >
                    <option value="0">Kabin</option>
                    <option value="1">UçakAltı</option>
                    
                  </select>
                <small className="form-text text-muted">
                 Ana Kategori
                </small>
                </div>
                 <div className="col-lg-2">
              
                  <select
                    className="form-control"
                    
                    name="subCatId"
                    
                    onChange={(e) => {

                      handleChange(e)
                    }}
                    value={subCatId}
                  >
                    {
                      subOptionRender()
                    }
                  </select>
                <small className="form-text text-muted">
                 Alt Kategori
                </small>
                </div>

                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    name="code"
                    placeholder=  {intl.formatMessage({ id: "MENU.SEARCH" })}
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
                    setCatId("0")
                    setSubCatId("0")
                    setReset(true)
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
