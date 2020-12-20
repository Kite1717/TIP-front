import React from "react"
import Uppy from '@uppy/core'
import axios from "axios"
import { Dashboard } from '@uppy/react'
import '@uppy/core/dist/style.css'
import '@uppy/drag-drop/dist/style.css'
import '@uppy/status-bar/dist/style.css'
import '@uppy/progress-bar/dist/style.css'
import '@uppy/informer/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import Swal from 'sweetalert2'

//http://localhost:4000/api/cti-library/upload-image


let files = []

let IsNonTIP;

const uppy = new Uppy({
  debug: true,
  autoProceed: false
})

uppy.on("file-added",(file) => {
  
  files.push(file)
})


let codeFlag = false
let code ;
let added = false;

//const metaFields = [{ id: 'code', name: 'Code', placeholder: 'Görsel kodu' }]
const metaFields = []
const strings = {
  strings:{
    addMoreFiles: 'Daha Fazla Dosya Yükleyin',
    edit: 'Düzenle',
    saveChanges: 'Değişiklikleri Kaydet',
    dropPaste: 'Dosyaları Buraya Sürükleyip Bırakabilirsiniz veya %{browse} seçebilirsiniz',
    browse : "buradan"
  }
}

const updateFiles = async(result,files) =>{


    
  files = []
    for(let j = 0 ; j < result.successful.length ;j++)
    {
       files.push(  result.successful[j].data)
    }

    return files



}

uppy.on("complete",result => {


  updateFiles(result,files).then((currentFile)=>{



      checkCode(result,currentFile).then(() => {

       
        if(!codeFlag){
          uploadData(result,currentFile).then(() => {
            
             Swal.fire({
                  
               icon: 'success',
               title: `Tüm görseller başarıyla yüklendi`,
               timer : 1500,
         
             }).then(() => {
              codeFlag = false
           
              added = false;
               uppy.reset();
               files = [];
             })
             
           })
        }
        else{
          Swal.fire({
            icon: 'error',
            title: `${code} kodlu resim önceden eklenmiştir lütfen kodu değiştiriniz!!!`
          }).then(() => {
             codeFlag = false
           
             added = false;
          })
        }
      })

  })
    


    

})

const checkCode = async (result,files) => {


  
        let i  = 0;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        for await (let item of files){
          await axios.get(`/cti-library/find/${item.name.split(".")[0]}`).then((res) => {
          if(res.data.type  && !added) // existing code // true ise var hata döndür
          { 
            codeFlag = true;
            added = true
            code = res.data.code
          }
          })
          i++
        }
}

const uploadData = async(result,files) =>{


          let j = 0;
          for await (let item of files){
            const formData = new FormData()
          formData.append("file",item)
          formData.append("code",   item.name.split(".")[0])
          formData.append("IsNonTIP", IsNonTIP)
           axios.post("/cti-library/upload-image", formData)
           j++
          }
}



export function UploadPicture({nonTip}) {

  React.useEffect(() => {
    IsNonTIP = nonTip
  },[nonTip])

  return (
    <>
      <Dashboard
        id="drag-drop"
        inline={true}
        height= "450px"
        uppy={uppy}
        replaceTargetContent ={true}
        showProgressDetails={true}
        metaFields = {metaFields}
        browserBackButtonClose = {true}
        note="Yüklemek istediğiniz dosyaları sürükleyip bırakınız..."
        locale={strings}
      />
    </>
  )
}