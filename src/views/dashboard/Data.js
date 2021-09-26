import {
    CCol,
    CRow,
    CWidgetSimple,
    CContainer,  
  } from '@coreui/react'

import CIcon from '@coreui/icons-react'
import Diagram from './Diagram/Diagram'
import './Data.css'
import { useEffect,useState } from 'react';

const Data = () => {
    const [outputLoad, setOutputLoad] = useState(0);
    const [totalEnergy, setTotalEnergy] = useState(0);
    const [batteryVoltage, setBatteryVoltage] = useState(0);
    const [bisVoltage, setBisVoltage] = useState(0);
    const [genaration, setGenaration] = useState(0);
    const [grid, setGrid] = useState(0);
    const [battery, setBattery] = useState(0);
    const [consumption, setConsumption] = useState(0);
    const MINUTE_MS =180000;
    const getData=()=>{
        fetch('https://api.jsonbin.io/b/614180c8aa02be1d44488791', {
            method: 'get'
        })
        .then(response=>response.json())
        .then(j=>{
            setOutputLoad(j.cards[0].outputLoad.value);
            setTotalEnergy(j.cards[1].totalEnergy.value);
            setBatteryVoltage(j.cards[2].batteryVoltage.value);
            setBisVoltage(j.cards[3].bisVoltage.value);
            setGenaration(j.diagram[0].genaration.value);
            setGrid(j.diagram[0].grid.value);
            setBattery(j.diagram[0].battery.value);
            setConsumption(j.diagram[0].consumption.value)
        })
        .catch(function(err) {
        // Error :(
        });
    }
    useEffect(() => {
        getData();
        const interval = setInterval(() => {
            getData();
        }, MINUTE_MS);
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])
    return (
        <>
            <CRow className="pt-10">
                <CCol xs="12" sm="6" lg="3">
                    <CContainer className="cardContainer">
                    <CRow>
                        <CContainer fluid className="align-self-center">
                            <strong style={{fontSize: 'medium'}}>Settings</strong>
                            <CIcon className="float-right" size={'lg'} name={'cilSettings'} />
                        </CContainer>
                    </CRow>

                    <CRow>
                        <CContainer fluid>
                            <CWidgetSimple header="title" text={outputLoad.toString()+" KWh"}>
                            </CWidgetSimple>
                        </CContainer>
                    </CRow>

                    <CRow>
                        <CContainer fluid>
                            <CWidgetSimple header="title" text={totalEnergy.toString()+" KWh"}>
                            </CWidgetSimple>
                        </CContainer>
                    </CRow>

                    <CRow>
                        <CContainer fluid>
                            <CWidgetSimple header="title" text={batteryVoltage.toString()+" KWh"}>
                            </CWidgetSimple>
                        </CContainer>
                    </CRow>

                    <CRow>
                        <CContainer fluid>
                            <CWidgetSimple header="title" text={bisVoltage.toString()+" KWh"}>
                            </CWidgetSimple>
                        </CContainer>
                    </CRow>
                    </CContainer>
                </CCol>
            
                <CCol xs="12" sm="6" lg="9">
                    <CRow>
                    <CContainer fluid>
                        <CWidgetSimple header="title">
                            <Diagram genaration={genaration} grid={grid} battery={battery} consumption={consumption}/>
                        </CWidgetSimple> 
                    </CContainer>
                    </CRow>
                    <CRow>
                    <CCol xs="auto" className="me-auto"></CCol>
                    <CCol xs="auto">
                        <CContainer className="float-right p-0">
                            <button type="button" className="btn btn-dark">
                            <CRow>
                            <i className="material-icons md-18 plus_icon" >cloud_download</i>
                                <CContainer>
                                Download
                                </CContainer>
                            </CRow>
                            </button>
                        </CContainer>
                    </CCol>
                        
                    </CRow>
                </CCol>   
            </CRow>
        </>
    )
}

export default Data;
