import React,{useEffect,useState} from 'react'
import { Table } from 'react-bootstrap'
import moment from "moment"

import {
    DatePickerField,
} from "../../../../../../_metronic/_partials/controls";
import{Button} from 'react-bootstrap'
import { Formik, } from "formik";

export const TIPReactionTime = ({ data }) => {
    const [currentData,setCurrentData] = useState([])

    useEffect(()=>{
        setCurrentData(data)

    },[data])


    const handleFilter =(values)=>{

        if(values.loginDate === "")
        {
            setCurrentData(data)
        }
        else{
            setCurrentData( data.filter((item)=>{
               
                let login = moment(values.loginDate).format("DD/MM/YYYY")
               

               
                let giris = moment(item.Tarih).format("DD/MM/YYYY")
             
               

             
               
                let gms = moment(giris,"DD/MM/YYYY").diff(moment(login,"DD/MM/YYYY"));

              
               
               
                if(gms >= 0  )
                {
                    return  item
                }
                
                return null
                

            }))
        }

    }

    const headings = [
        "Cihaz Kimlik No",
        "Soyadı",
        "Firma",
        "Makine",
        "Makine Seri No",
        "Tarih",
        "Tehdit Kategorisi",
        "Tehdit Dosya Adı",
        "Karar",
        "İsabet Süresi",
        "Yanlış Alarm Süresi"
    ]

    const cells = [
        "CihazKimlikNo",
        "Soyadı",
        "Firma",
        "Makine",
        "MakineSeriNo",
        "Tarih",
        "TehditKategorisi",
        "TehditDosyaAdi",
        "Karar",
        "IsabetSuresi",
        "YanlisAlarmSuresi"
    ]

    return (
        <>
            <Formik
        enableReinitialize={true}
        initialValues = {
            {
                loginDate : "",
               
            }
        }

        onSubmit={(values) => {
        

            handleFilter(values)


        }}
      >
        {({ handleSubmit, handleChange, handleBlur, setFieldValue, values, errors, touched }) => (
          <>
        <div className="form-group row">
            <div className="col-lg-4">
            <DatePickerField name="loginDate" label="Tarih" />
            </div>
            <div className="col-lg-1">
            <Button variant="primary" onClick = {handleSubmit} > Filtrele</Button>
            </div>
            <div className="col-lg-1">
            <Button variant="danger" onClick ={()=>{
                setFieldValue("loginDate","")
              
                handleSubmit()

            }} > Temizle</Button>
            </div>
        </div>

        </>
         )}
         </Formik>
            {
                currentData &&
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            {headings.map((item, index) => (
                                <th key={index}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentData.map((dataItem, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        {
                                            Object.keys(dataItem).map((item1, index) => {
                                                if (cells.indexOf(item1) !== -1 && item1 !== "createdAt") {
                                                    return (<td>{Object.values(dataItem)[index]}</td>)
                                                } else if (cells.indexOf(item1) !== -1 && item1 === "createdAt") {
                                                    return (<td>{moment(Object.values(dataItem)[index]).format("DD.MM.YYYY")}</td>)
                                                }
                                                return null;
                                            })
                                        }
                                    </tr>
                                )

                            })
                        }
                    </tbody>
                </Table>
            }

        </>
    )
}
