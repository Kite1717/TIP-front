// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios"
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";


export function TIPAdminsTable() {
  // Users UI Context

  // const { totalCount, entities, listLoading } = currentState;
  const [entities,setEntities] = useState(null)
  //const [totalCount,setTotalCount] = useState(0)
 

  const roleFormatter =(cell,obj)=>{
    if(cell === 0){
      return "Admin";
    }else if(cell === 1){
      return "Eğitmen"
    }else if(cell === 2){
      return "Şirket Yöneticisi"
    }
    
  }
  useEffect(() => {
    axios.get("/user/tip/admins").then((res) => {
      setEntities(res.data.entities)
    })
  }, []);
  // Table columns
  const columns = [
    {
      dataField: "fullName",
      text: "Ad Soyad",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "role",
      text: "Rol",
      sort: true,
      sortCaret: sortCaret,
      formatter : roleFormatter,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "phoneNumber",
      text: "Telefon Numarası",
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: "tcNo",
      text: "TC Numarası",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "deviceIdNo",
      text: "Cihaz Id",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "address",
      text: "Adres",
      sort: true,
      sortCaret: sortCaret,
    },
   
  ];
 
  return (
    <>
    
           
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
 
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            
       
    </>
  );
}
