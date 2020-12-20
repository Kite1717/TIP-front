import React from "react";
import jexcel from "jexcel";
import axios from "axios"

import "../../../../../node_modules/jexcel/dist/jexcel.css";
import { CardHeaderToolbar } from "../../../../_metronic/_partials/controls";

class Jexcel extends React.Component {
  constructor(props) {
    super(props);
    this.options = props.options;
    this.API_URL = props.apiUrl;
    this.wrapper = React.createRef();
  }

  componentDidMount = function() {
    this.el = jexcel(this.wrapper.current, this.options);
  };
  
 
  addRow = function() {
    this.el.insertRow();
  };

  setData = function() {
    let temp = [] ;
    let count = 0;
    let data = this.el.options.data;
    let columnCount = this.el.options.data[0].length
    for(let i=0 ; i<data.length ; i++){
      for(let j=0; j<data[i].length ; j++){
        if(data[i][j] === ""){
          count++;
        }
      }
      if(count !== columnCount){
        temp.push(data[i])
      }
      count = 0;
    }

    axios.post(this.API_URL, temp)
  }

  render() {
    return (
      <div style={{overflow:"scroll"}}>
        <div ref={this.wrapper} />
        <br />
        <span style={{display:"flex", marginTop:"2rem"}}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary mr-5"
            onClick={ () => this.addRow()}
          >
            Yeni Satır Ekle
          </button>
        </CardHeaderToolbar>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-warning"
            onClick={ () => this.setData()}
          >
            Kaydet
          </button>
        </CardHeaderToolbar>
        </span>
      </div>
    );
  }
}

export default Jexcel