import React from 'react'
import { Table } from 'react-bootstrap'
import moment from "moment"

export const IORecords = ({ data }) => {

    console.log(data, "ptoutpyutpyuotup")

    const headings = [
        "Cihaz Kimlik No",
        "Soyadı",
        "Firma",
        "Makine",
        "Makine Seri No",
        "Giriş Tarihi",
        "Çıkış Tarihi",
    ]

    const cells = [
        "CihazKimlikNo",
        "Soyadı",
        "Firma",
        "Makine",
        "MakineSeriNo",
        "GirisTarihi",
        "CikisTarihi",
    ]

    return (
        <>
            {
                data &&
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
                            data.map((dataItem, index) => {
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