// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import {Button } from "react-bootstrap";
import { useIntl } from "react-intl";
import { UploadPicture } from "../../../components/PictureUpload/UploadPicture";

//import AddPictureForm from "../../../components/PictureUpload/AddPictureForm";
// Validation schema

export function TIPLibraryEditForm({
  saveTIPLibrary
}) {

  const [nonTip,setNonTip] = React.useState("false")

  const intl = useIntl()


  const handleChange = (e) =>{
    setNonTip(e.target.value)
   }

  return (
    <>
      <div className="form-group row">
      
      <div className="col-lg-6">
        <span   style = {{fontSize : "14px"}}className="label label-info label-inline mx-2 mb-3">Non TIP</span>
        <select
          className="form-control"
          name="nonTip"
          onChange={(e) => {
            
            handleChange(e)
          
          }}
          value={nonTip}
        >
          <option value="false">Hayır</option>
          <option value="true">Evet</option>
          
        </select>
        
      </div>
    </div>
      <UploadPicture nonTip={nonTip}  />
      <Button onClick = {saveTIPLibrary} className = "mt-2" variant = "success">{intl.formatMessage({ id: "MENU.CLOSE" })}</Button>
    </>
  );
}
