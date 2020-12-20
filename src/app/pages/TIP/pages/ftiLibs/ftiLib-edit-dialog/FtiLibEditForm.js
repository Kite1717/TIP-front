// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";

import { useIntl } from "react-intl";
import { UploadPictureFTI } from "../../../components/PictureUpload/UploadPictureFTI";

import {Button } from "react-bootstrap";

export function FtiLibEditForm({
  saveFtiLib,
  ftiLib,
  actionsLoading,
  onHide,
}) {


  const intl = useIntl()
 const[catId,setCatId] = React.useState("0")
 const[subCatId,setSubCatId] = React.useState("0")
 const[nonTip,setNonTip] = React.useState("false")



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

 const handleTipChange = (e) =>{

  setNonTip(e.target.value)
 }
 
  return (
    <>
        <div className="form-group row">
      
                <div className="col-lg-4">
                  <span   style = {{fontSize : "14px"}}className="label label-info label-inline mx-2 mb-3">Ana Kategori</span>
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
                  
                </div>
                <div className="col-lg-4">
                <span  style = {{fontSize : "14px"}} className="label label-info label-inline mx-2 mb-3">Alt Kategori</span>
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
                </div>
                <div className="col-lg-4">
                <span  style = {{fontSize : "14px"}} className="label label-info label-inline mx-2 mb-3">Non TIP</span>
                  <select
                    className="form-control"
                
                    name="nonTip"
                    
                    onChange={(e) => {
                      handleTipChange(e)
                    }}
                    value={nonTip}
                  >
                    <option value="false">Hayır</option>
                    <option value="true">Evet</option>
                  </select>
                </div>
                
              </div>
      <UploadPictureFTI  catId = {catId} subCatId = {subCatId} isNonTip={nonTip} />
      <Button onClick = {saveFtiLib} className = "mt-2" variant = "success">{intl.formatMessage({ id: "MENU.CLOSE" })}</Button>
    </>
  );
}
