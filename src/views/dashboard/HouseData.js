import {
    CCol,
    CRow,
    CWidgetSimple,
    CContainer,
    CCard,
    CCardBody,
    CCardHeader,
    CListGroup,
    CListGroupItem,
} from '@coreui/react'
import Diagram from './Diagram/Diagram'
import './HouseData.css'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const Data = () => {
    const MINUTE_MS = 180000;
    const id = useHistory().location.pathname.split('/').lastItem
    const initialLine = { showXarrow: true, animation: 0, showHead: false, showTail: false, color: '#E0E0E0' }
    const initialData = {
        gridVoltage: '0 V',
        gridPower: '0 W',
        gridFrequency: '0 Hz',
        gridCurrent: '0 A',
        systemOutputVoltage: '0 W',
        systemOutputPower: '0 W',
        systemOutputFrequency: '0 HZ',
        systemOutputCurrent: '0 A',
        systemOutputLoadPercentage: '0 %',
        batteryVoltage: '0 V',
        batteryStatus: 'Unknown',
        PVInputVoltage1: '0 V',
        PVInputVoltage2: '0 V',
        PVPower: '0 V',
    }
    const [data, setData] = useState(initialData);
    const [generationLine, setGenerationLine] = useState(initialLine);
    const [gridHomeLine, setGridHomeLine] = useState(initialLine);
    const [dsrLoadsLine, setDsrLoadsLine] = useState(initialLine);
    const [criticalLoadsLine, setCriticalLoadsLine] = useState(initialLine);
    const resetData = () => {
        setData({
            gridVoltage: '0 V',
            gridPower: '0 W',
            gridFrequency: '0 Hz',
            gridCurrent: '0 A',
            systemOutputVoltage: '0 W',
            systemOutputPower: '0 W',
            systemOutputFrequency: '0 HZ',
            systemOutputCurrent: '0 A',
            systemOutputLoadPercentage: '0 %',
            batteryVoltage: '0 V',
            batteryStatus: 'Unknown',
            PVInputVoltage1: '0 V',
            PVInputVoltage2: '0 V',
            PVPower: '0 V',
        })
        setGenerationLine({ showXarrow: true, animation: 0, showHead: false, showTail: false, color: '#E0E0E0' })
        setGridHomeLine({ showXarrow: true, animation: 0, showHead: false, showTail: false, color: '#E0E0E0' })
        setDsrLoadsLine({ showXarrow: true, animation: 0, showHead: false, showTail: false, color: '#E0E0E0' })
        setCriticalLoadsLine({ showXarrow: true, animation: 0, showHead: false, showTail: false, color: '#E0E0E0' })
    }

    useEffect(() => {
        const getData = () => {
            fetch(`https://dashboard-backend-rapid.herokuapp.com/house/${id}`, {
                method: "get",
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const pvPower = parseFloat(data[14].val) + parseFloat(data[13].val)
                const gridVoltage=parseFloat(data[5].val).toFixed(0)
                const gridCurrent=parseFloat(data[1].val).toFixed(0)
                const systemOutputVoltage=parseFloat(data[10].val)
                const systemOutputCurrent=parseFloat(data[8].val)
                const gridPower = gridCurrent*gridVoltage
                const systemOutputPower = systemOutputCurrent*systemOutputVoltage
                //TODO get drsPower
                const drsPower = 0
                setData({
                    gridVoltage: gridVoltage + " " + data[5].unit,
                    gridPower: gridPower + " " + data[13].unit,
                    gridFrequency: data[2].val + " " + data[2].unit,
                    gridCurrent: gridCurrent + " " + data[1].unit,
                    systemOutputVoltage: systemOutputVoltage + " " + data[10].unit,
                    systemOutputPower: systemOutputPower.toFixed(0) + " " + data[13].unit,
                    systemOutputFrequency: "60 Hz",
                    systemOutputCurrent: systemOutputCurrent + " " + data[8].unit,
                    systemOutputLoadPercentage: data[22].val +" "+data[22].unit,
                    batteryVoltage: data[17].val + " V",
                    batteryStatus: data[20].val,
                    PVInputVoltage1: data[15].val + " " + data[15].unit,
                    PVInputVoltage2: data[9].val + " " + data[9].unit,
                    PVPower: pvPower + " " + data[14].unit,
                })
                if (pvPower === 0) {//for generation to stortera line
                    setGenerationLine({ showXarrow: true, animation: 0, showHead: false, showTail: false, color: '#E0E0E0' })
                } else if (pvPower > 0) {
                    setGenerationLine({ showXarrow: true, animation: 1, showHead: true, showTail: false, color: '#64B42C' })
                } else {
                    setGenerationLine({ showXarrow: true, animation: -1, showHead: false, showTail: true, color: '#64B42C' })
                }

                if (gridPower === 0) {//for gridHome to stortera line
                    setGridHomeLine({ showXarrow: true, animation: 0, showHead: false, showTail: false, color: '#E0E0E0' })
                } else if (gridPower > 0) {
                    setGridHomeLine({ showXarrow: true, animation: -1, showHead: false, showTail: true, color: '#64B42C' })
                } else {
                    setGridHomeLine({ showXarrow: true, animation: 1, showHead: true, showTail: false, color: '#64B42C' })
                }

                if (drsPower === 0) {//for dsrLoads to stortera line
                    setDsrLoadsLine({ showXarrow: true, animation: 0, showHead: false, showTail: false, color: '#E0E0E0' })
                } else if (drsPower > 0) {
                    setDsrLoadsLine({ showXarrow: true, animation: 1, showHead: true, showTail: false, color: '#64B42C' })
                } else {
                    setDsrLoadsLine({ showXarrow: true, animation: -1, showHead: false, showTail: true, color: '#64B42C' })
                }
                //for criticalLoads to stortera line
                if (systemOutputPower === 0) {
                    setCriticalLoadsLine({ showXarrow: true, animation: 0, showHead: false, showTail: false, color: '#E0E0E0' })
                } else if (systemOutputPower > 0) {
                    setCriticalLoadsLine({ showXarrow: true, animation: 1, showHead: true, showTail: false, color: '#64B42C' })
                } else {
                    setCriticalLoadsLine({ showXarrow: true, animation: -1, showHead: false, showTail: true, color: '#64B42C' })
                }

            }).catch(err => {
                console.log(err)
            })
        }

        resetData()
        getData()
        const interval = setInterval(() => {
            getData();
        }, MINUTE_MS);
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [id])
    return (
        <>
            <CRow className="pt-10">
                <CCol xs="12" sm="6" lg="5">
                    <CCard>
                        <CCardHeader className="card text-center" style={{ fontWeight: "bold" }}>PV & Battery</CCardHeader>
                        <CCardBody style={{ padding: 5 }}>
                            <CListGroup>
                                <CListGroupItem style={{ fontSize: 12, padding: 5 }}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >Battery Voltage</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{ textAlign: 'center' }}>{data.batteryVoltage}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{ fontSize: 12, padding: 5 }}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >Battery Status</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{ textAlign: 'center' }}>{data.batteryStatus}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{ fontSize: 12, padding: 5 }}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >PV Input Voltage 1</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{ textAlign: 'center' }}>{data.PVInputVoltage1}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{ fontSize: 12, padding: 5 }}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >PV Input Voltage 2</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{ textAlign: 'center' }}>{data.PVInputVoltage2}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{ fontSize: 12, padding: 5 }}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >PV Power</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{ textAlign: 'center' }}>{data.PVPower}</CCol>
                                    </CRow>
                                </CListGroupItem>
                            </CListGroup>
                        </CCardBody>
                    </CCard>
                    <CCard>
                        <CCardHeader className="card text-center" style={{ fontWeight: "bold" }}>GRID</CCardHeader>
                        <CCardBody style={{ padding: 5 }}>
                            <CListGroup>
                                <CListGroupItem style={{ fontSize: 12, padding: 5 }}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >Grid Voltage</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{ textAlign: 'center' }}>{data.gridVoltage}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{ fontSize: 12, padding: 5 }}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >Grid Power (Import/Export)</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{ textAlign: 'center' }}>{data.gridPower}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{ fontSize: 12, padding: 5 }}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >Grid Frequency</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{ textAlign: 'center' }}>{data.gridFrequency}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{ fontSize: 12, padding: 5 }}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >Grid Current</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{ textAlign: 'center' }}>{data.gridCurrent}</CCol>
                                    </CRow>
                                </CListGroupItem>
                            </CListGroup>
                        </CCardBody>
                    </CCard>
                    <CCard>
                        <CCardHeader className="card text-center" style={{ fontWeight: "bold" }}>System Output</CCardHeader>
                        <CCardBody style={{ padding: 5 }}>
                            <CListGroup>
                                <CListGroupItem style={{ fontSize: 12, padding: 5 }}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >System Output Voltage</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{ textAlign: 'center' }}>{data.systemOutputVoltage}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{ fontSize: 12, padding: 5 }}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >System Output Frequency</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{ textAlign: 'center' }}>{data.systemOutputFrequency}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{ fontSize: 12, padding: 5 }}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >System Output Current</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{ textAlign: 'center' }}>{data.systemOutputCurrent}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{ fontSize: 12, padding: 5 }}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >System Output Load Percentage</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{ textAlign: 'center' }}>{data.systemOutputLoadPercentage}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{ fontSize: 12, padding: 5 }}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >System Output Power</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{ textAlign: 'center' }}>{data.systemOutputPower}</CCol>
                                    </CRow>
                                </CListGroupItem>
                            </CListGroup>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol xs="12" sm="6" lg="7">
                    <CRow>
                        <CContainer fluid>
                            <CWidgetSimple header="">
                                <Diagram data={data} generationLine={generationLine} gridHomeLine={gridHomeLine} dsrLoadsLine={dsrLoadsLine} criticalLoadsLine={criticalLoadsLine} />
                            </CWidgetSimple>
                        </CContainer>
                    </CRow>
                </CCol>
            </CRow>
        </>
    )
}

export default Data;
