import React from 'react'
import { Table } from 'react-bootstrap'

export const ShiftRecords = ({data}) => {

    const [shifts,setShifts] = React.useState([])
    const [shiftCount,setShiftCount] = React.useState([])

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
            setShifts(temp)
            setShiftCount(tempCount)
        }
        console.log(shifts)
    },[data])

    const headings = [
        "Giriş Tarihi",
        "Günlük Vardiya"
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
                            shifts.map((item,index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item}</td>
                                        <td>{shiftCount[index]}</td>
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
