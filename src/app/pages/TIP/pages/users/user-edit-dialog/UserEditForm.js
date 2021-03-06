// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal, Alert } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
} from "../../../../../../_metronic/_partials/controls";
import MaskedInput from "react-text-mask"
import { useIntl } from "react-intl";
// Validation schema
const UserEditSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Minimum 2 karakter giriniz")
    .required("Bu Alan Boş Bırakılamaz"),
  phoneNumber: Yup.string()
    .min(14, "Minimum 14 karakter giriniz")
    .required("Bu Alan Boş Bırakılamaz"),
    email: Yup.string()
    .email("Lütfen geçerli bir e-mail adresi giriniz."),
  deviceIdNo: Yup.string().required("Bu Alan Boş Bırakılamaz"),
  tcNo: Yup.string()
    .min(11, "Tc Numarası 11 karakterden oluşur").max(11, "Tc Numarası 11 karakterden oluşur")
    .required("Bu Alan Boş Bırakılamaz")
});


export function UserEditForm({
  saveUser,
  user,
  actionsLoading,
  onHide,
}) {

  const intl = useIntl();
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        validationSchema={UserEditSchema}
        onSubmit={(values) => {
          saveUser(values);
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, setFieldValue, values, errors, touched }) => (
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
                    <Field
                      name="fullName"
                      component={Input}
                      placeholder="Ad Soyad"
                      label="Ad Soyad"
                    />
                  </div>
                  {/* Last Name */}
                  <div className="col-lg-4">
                    <label>Telefon Numarası</label>
                    <MaskedInput
                      type="text"
                      name="phoneNumber"
                      className="form-control"
                      placeholder="(___) _ __"
                      guide={false}
                      mask={[
                        '(',
                        /[1-9]/,
                        /\d/,
                        /\d/,
                        ')',
                        ' ',
                        /\d/,
                        /\d/,
                        /\d/,
                        '-',
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                      ]}
                      onChange={handleChange}
                      value={values.phoneNumber}
                      onBlur={handleBlur}
                    />
                    {
                      errors.phoneNumber && touched.phoneNumber &&
                      (
                        <Alert variant="danger">{errors.phoneNumber}</Alert>
                      )
                    }
                  </div>
                  {/* Login */}
                  <div className="col-lg-4">
                    <Select name="role" label="Rol">
                    
                      <option value="1">Eğitmen</option>
                      <option value="2">Şirket Yöneticisi</option>
                      <option value="3">Kullanıcı</option>
                    </Select>
                  </div>
                </div>
                {/* Email */}
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      type="email"
                      name="email"
                      component={Input}
                      placeholder="Email"
                      label="Email"
                    />
                  </div>
                  {/* IP Address */}
                  <div className="col-lg-4">
                    <Field
                      name="deviceIdNo"
                      component={Input}
                      placeholder="Cihaz Id Numarası"
                      label="Cihaz Id Numarası"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="tcNo"
                      component={Input}
                      placeholder="TC Numarası"
                      label="TC Numarası"
                      onChange={(e) => {

                      
                        if (/^\d+$/.test(e.target.value)) {
                          if(e.target.value.length <= 11){
                            setFieldValue("tcNo", e.target.value)
                          }else{
                            setFieldValue("tcNo", e.target.value.substr(0,11))
                          } 
                        }
                        else {
                          if(e.target.value.length <= 11){
                            setFieldValue("tcNo", e.target.value.substr(0,e.target.value.length -1))
                          }
                        }

                      }}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/* Gender */}
                  <div className="col-lg-4">
                    <Select name="isTipAdmin" label="TIP Admini mi?">
                      <option value="0">Hayır</option>
                      <option value="1">Evet</option>
                    </Select>
                  </div>
                  {/* Type */}
                  <div className="col-lg-8">
                    <Field
                      name="address"
                      component={Input}
                      placeholder="Adres"
                      label="Adres"
                    />
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
