// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useIntl } from "react-intl";

import {
  Select,
} from "../../../../../../_metronic/_partials/controls";

// Validation schema
const SystemInformationEditSchema = Yup.object().shape({
  tipSoftwareVersions: Yup.string()
    .min(3, "Minimum 3 karakter giriniz"),
  softwareTechnicalFeatures: Yup.string()
    .min(3, "Minimum 3 karakter giriniz"),
  xRayDevices: Yup.string()
    .min(3, "Minimum 3 karakter giriniz"),
});


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));
export function SystemInformationEditForm({
  saveSystemInformation,
  systemInformation,
  actionsLoading,
  onHide,
}) {
  const intl = useIntl();
  const classes = useStyles();
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={systemInformation}
        validationSchema={SystemInformationEditSchema}
        onSubmit={(values) => {
       
          saveSystemInformation(values);
        }}
      >
        {({ handleSubmit, handleChange }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">

                <div className="form-group row">
                  {/* First Name */}
                  <div className="col-lg-4">
                    <TextField
                      name="tipSoftwareVersions"
                      label="TIP Yazılım Versiyonları"
                      multiline
                      rows="4"                     
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      onChange = {handleChange}
                    />
                  </div>
                  {/* Last Name */}
                  <div className="col-lg-4">
                  <TextField
                      label="Yazılım Teknik Özellikleri"
                      name="softwareTechnicalFeatures"
                      multiline
                      rows="4"                     
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      onChange = {handleChange}
                        />
                  </div>
                  {/* Login */}
                </div>
                {/* Email */}
                <div className="form-group row">
                  {/* IP Address */}
                  <div className="col-lg-4">
                    {/* <Field
                      name="xRayDevices"
                      component={Input}
                      placeholder="X-Ray Cihazları"
                      label="X-Ray Cihazları"
                      customFeedbackLabel="We'll never share systemInformation IP Address with anyone else"
                    /> */}
                    <TextField
                      label="X-Ray Cihazları"
                      name="xRayDevices"
                      multiline
                      rows="4"                     
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      onChange = {handleChange}
                        />
                  </div>
                </div>
                <div className="form-group row">
                
                  <div className="col-lg-4">
                    <Select name="standAloneMode" label="Stand-Alone Mode">
                      <option value="0">Kapalı</option>
                      <option value="1">Açık</option>
                    </Select>
                  </div>
               
                  <div className="col-lg-4">
                    <Select name="networkMode" label="Network Mode">
                      <option value="0">Kapalı</option>
                      <option value="1">Açık</option>
                    </Select>
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
               {intl.formatMessage({ id: "MENU.CANCEL" })}
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                {intl.formatMessage({ id: "MENU.SAVE" })}
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
