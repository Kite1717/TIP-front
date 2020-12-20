import React from "react";
import jexcel from "jexcel";
import axios from "axios"

import "../../../../../node_modules/jexcel/dist/jexcel.css";
import { CardHeaderToolbar ,Notice} from "../../../../_metronic/_partials/controls";
import Swal from 'sweetalert2'

const glhr = {
  data: [[], []],
  minDimensions: [15, 500],
  allowInsertColumn: false,
    allowInsertRow : false,
    allowManualInsertColumn: false,
    allowManualInsertRow: false,
    defaultColWidth : 120,
  columns: [
    { title: "TIP Sayısı" },
    { title: "İsabet Sayısı" },
    { title: "İsabet Oranı" },
    { title: "TIP Sayısı Bombs" },
    { title: "İsabet Sayısı Bombs" },
    { title: "İsabet Oranı Bombs" },
    { title: "TIP Sayısı Guns" },
    { title: "İsabet Sayısı Guns" },
    { title: "İsabet Oranı Guns" },
    { title: "TIP Sayısı Knife" },
    { title: "İsabet Sayısı Knife" },
    { title: "İsabet Oranı Knife" },
    { title: "TIP Sayısı Others" },
    { title: "İsabet Sayısı Others" },
    { title: "İsabet Oranı Others" },
  ]
}

class JexcelGlhr extends React.Component {
  constructor(props) {
    super(props);
    this.options = glhr;
    this.API_URL = props.apiUrl;
    this.wrapper = React.createRef();
  }

  componentDidMount = function () {
    this.el = jexcel(this.wrapper.current, this.options);
  };


  addRow = function () {
    this.el.insertRow();
  };

  setData = function () {

    document.getElementById("save").disabled = true
    

    let temp = [];
    let count = 0;
    let data = this.el.options.data;
    let columnCount = this.el.options.data[0].length
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] === "") {
          count++;
        }
      }
      if (count !== columnCount) {
        temp.push(data[i])
      }
      count = 0;
    }

    Swal.fire({
         
      icon: 'info',
      title: 'Lütfen bekleyin...',
      showConfirmButton: false,
      timer: 99999
    })

    if(temp.length > 0)
    {
    axios.post("/de/glhr", temp).then(() => {
      Swal.fire({

        icon: 'success',
        title: 'Verileriniz başarı ile kaydedilmiştir.Sayfanızı temizliyoruz...',
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        window.location.reload();
      })

    })
  }
  else{

    Swal.fire({
     
      icon: 'error',
      title: 'Lütfen veri ekleyin.',
      showConfirmButton: false,
      timer: 1200
    })

    document.getElementById("save").disabled = false


  }
  }

  render() {
    return (
      <>

      <span style={{  marginTop:"2rem"}}>
          <Notice className = "mr-3" icon="flaticon-Info font-primary">
          <span>
          Lütfen En fazla 500 satırlık bilgi giriniz.
          </span>{" "}
        
        </Notice>
        <br/>
        <CardHeaderToolbar>
        <button
        id="save"
          type="button"
          className="btn btn-warning"
          onClick={ () => this.setData()}
        >
          Kaydet
        </button>
      </CardHeaderToolbar>
    
      </span>
       <div style={{overflow:"scroll"}}>
        <br />
        <div ref={this.wrapper} />
  
     
      </div>
        </>
    );
  }
}

export default JexcelGlhr