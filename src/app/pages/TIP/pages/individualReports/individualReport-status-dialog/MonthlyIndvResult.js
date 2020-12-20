import React from "react";
import {  Tabs, Tab, TabContent, Table } from "react-bootstrap";
import moment from "moment"
export function MonthlyIndvResult({ data }) {


    console.log(data, "aısdgalıda")

   
    const [bagage,setBagage] =React.useState(0)

    React.useEffect(() => {
        if(data){
            let temp = 0;
            data.map(item=> {
                temp += parseInt(item.BagajSayisi)
                return 0 ;
            })
            setBagage(temp)
        }
    },[data])

    const generalHeadings = [
        "Firma",
        "Soyadı",
        "Cihaz Kimlik No",
        "Bagaj Sayısı",
        "TIP Sayısı",
        "İsabet Sayısı",
        "Yanlıs Alarm Sayısı",
        "Kaçırıldı Sayısı",
        "İsabet Oranı",
        "Yanlış Alarm Oranı",
        "İsabet Süresi",
        "Yanlış Alarm Süresi",
        "Tarih"
    ]
    const generalCells = [
        "Firma",
        "Soyadı",
        "CihazKimlikNo",
        "BagajSayisi",
        "TIPSayisi",
        "IsabetSayisi",
        "YanlisAlarmSayisi",
        "KacirildiSayisi",
        "IsabetOran",
        "YanlisAlarmOran",
        "IsabetSuresi",
        "YanlisAlarmSuresi",
        "createdAt"
    ]

    const bombHeadings = [
        "TIP Sayısı Bombs",
        "İsabet Sayısı Bombs",
        "Kaçırıldı Sayısı Bombs",
        "İsabet Oranı Bombs",
        "Tarih"
    ]

    const bombCells = [
        "TIPSayisiBombs",
        "IsabetSayisiBombs",
        "KacirildiSayisiBombs",
        "IsabetOraniBombs",
        "createdAt"
    ]
    const gunsCells = [
        "TIPSayisiGuns",
        "IsabetSayisiGuns",
        "KacirildiSayisiGuns",
        "IsabetOraniGuns",
        "createdAt"
    ]

    const gunsHeadings = [
        "TIP Sayısı Guns",
        "İsabet Sayısı Guns",
        "Kacırıldı Sayısı Guns",
        "İsabet Oranı Guns",
        "Tarih"
    ]

    const othersHeadings = [
        "TIP Sayısı Others",
        "İsabet Sayısı Others",
        "Kacırıldı Sayısı Others",
        "İsabet Oranı Others",
        "Tarih"
    ]

    const othersCells = [
        "TIPSayisiOthers",
        "IsabetSayisiOthers",
        "KacirildiSayisiOthers",
        "IsabetOraniOthers",
        "createdAt"
    ]

    


    return (

        <>
        {
            data &&
            <Tabs defaultActiveKey="genel" id="uncontrolled-tab-example">
            <Tab eventKey="genel" title="Genel">
                <TabContent>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                {generalHeadings.map((item, index) => (
                                    <th key={index}>{item}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((dataItem,index) => {
                                    return(
                                        <tr>
                                        <td>{index + 1}</td>
                                        {
                                            Object.keys(dataItem).map((item1,index) =>{
                                                if(generalCells.indexOf(item1) !== -1 && item1 !== "createdAt")
                                                {
                                                    return(<td>{Object.values(dataItem)[index]}</td>)
                                                }else if(generalCells.indexOf(item1) !== -1 && item1 === "createdAt"){
                                                    return(<td>{moment(Object.values(dataItem)[index]).format("DD.MM.YYYY")}</td>)
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
                </TabContent>
            </Tab>



            <Tab eventKey="bomb" title="Bomb">
            <TabContent>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                {bombHeadings.map((item, index) => (
                                    <th key={index}>{item}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((dataItem,index) => {
                                    return(
                                        <tr>
                                        <td>{index + 1}</td>
                                        {
                                            Object.keys(dataItem).map((item1,index) =>{
                                                if(bombCells.indexOf(item1) !== -1 && item1 !== "createdAt")
                                                {
                                                    return(<td>{Object.values(dataItem)[index]}</td>)
                                                }else if(bombCells.indexOf(item1) !== -1 && item1 === "createdAt"){
                                                    return(<td>{moment(Object.values(dataItem)[index]).format("DD.MM.YYYY")}</td>)
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
                </TabContent>
            </Tab>



            <Tab eventKey="knife" title="Knife">
            <TabContent>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                {gunsHeadings.map((item, index) => (
                                    <th key={index}>{item}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((dataItem,index) => {
                                    return(
                                        <tr>
                                        <td>{index + 1}</td>
                                        {
                                            Object.keys(dataItem).map((item1,index) =>{
                                                if(gunsCells.indexOf(item1) !== -1 && item1 !== "createdAt")
                                                {
                                                    return(<td>{Object.values(dataItem)[index]}</td>)
                                                }else if(gunsCells.indexOf(item1) !== -1 && item1 === "createdAt"){
                                                    return(<td>{moment(Object.values(dataItem)[index]).format("DD.MM.YYYY")}</td>)
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
                </TabContent>
            </Tab>


            <Tab eventKey="others" title="Others">
            <TabContent>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                {othersHeadings.map((item, index) => (
                                    <th key={index}>{item}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((dataItem,index) => {
                                    return(
                                        <tr>
                                        <td>{index + 1}</td>
                                        {
                                            Object.keys(dataItem).map((item1,index) =>{
                                                if(othersCells.indexOf(item1) !== -1 && item1 !== "createdAt")
                                                {
                                                    return(<td>{Object.values(dataItem)[index]}</td>)
                                                }else if(othersCells.indexOf(item1) !== -1 && item1 === "createdAt"){
                                                    return(<td>{moment(Object.values(dataItem)[index]).format("DD.MM.YYYY")}</td>)
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
                </TabContent>
            </Tab>


            <Tab eventKey="baggage" title="Toplam Görüntülenen Bagaj Sayısı">
                <TabContent>
                    <div>
                        Toplam Görüntülenen Bagaj Sayısı : {bagage}
                    </div>
                </TabContent>
            </Tab>
        </Tabs>
        }
            
        </>
    );
}
