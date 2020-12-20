import React,{useEffect,useState} from 'react'
import { Table } from 'react-bootstrap'

import moment from "moment"

import {
    DatePickerField,
} from "../../../../../../_metronic/_partials/controls";
import{Button} from 'react-bootstrap'
import { Formik, } from "formik";

export const ShiftRecords = ({data}) => {


    const [currentData,setCurrentData] = useState([])
    const [avaData,setAvaData] =  useState([])
    useEffect(()=>{
        setAvaData(currentData)

    },[currentData])


    const handleFilter =(values)=>{

        if(values.loginDate === "" || values.logoutDate === "")
        {
            console.log(currentData,"xxxxxxxxxxxxxxxxxxxx")
            setAvaData(currentData)
        }
        else{
            setAvaData( currentData.filter((item)=>{
               
                let login = moment(values.loginDate).format("DD/MM/YYYY")
              

               
                let giris = moment(item.GirisTarihi).format("DD/MM/YYYY")
               
               

             
               
                let gms = moment(giris,"DD/MM/YYYY").diff(moment(login,"DD/MM/YYYY"));

              
              
               
                if(gms >= 0 )
                {
                    return  item
                }
                
                return null
                

            }))
        }

    }


    

    React.useEffect(() => {
        let tempCount = []
        let temp = []
        if(data){
            data.forEach(item => {
                if(temp.indexOf(item.GirisTarihi.split(' ')[0]) === -1){
                    temp.push(item.GirisTarihi.split(' ')[0])
                    tempCount.push(1)
                }else{
                    tempCount[temp.indexOf(item.GirisTarihi.split(' ')[0])]++
                }
                    
            })
           
        }

        let curData = []

        for(let i =0 ;i < temp.length ; i++)
        {
            curData.push({
                GirisTarihi : temp[i],
                Vardiya : tempCount[i],
            })
        }

        setCurrentData(curData)
    },[data])



    const headings = [
        "Giriş Tarihi",
        "Günlük Vardiya"
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
            <DatePickerField name="loginDate" label="Giriş Tarihi" />
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
                avaData &&
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
                            avaData.map((item,index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.GirisTarihi}</td>
                                        <td>{item.Vardiya}</td>
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
