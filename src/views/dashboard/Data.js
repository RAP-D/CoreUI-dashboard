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
    const initialState={
        cards: [{
            outputLoad:{
                name:"Output Load",
                value: 0.00
            }
        },{
            totalEnergy:{
                name:"Total Energy",
                value: 0.00
            }
        },{
            batteryVoltage:{
                name:"Battery Voltage",
                value: 0.00
            }
        },{
            bisVoltage:{
                name:"BUS Voltage",
                value: 0.00
            }
        }],
        diagram: [{
            generation:{
                name:"Generation",
                direction: false,
                value: 0.00
            },
            grid: {
                name:"Grid",
                direction: false,
                value: 0.00
            },
            battery: {
                name:"Battery",
                direction: false,
                value: 0.00
            },
            consumption: {
                name:"Home",
                direction: false,
                value: 0.00
            }
        }]
    }
    const [data, setData] = useState(initialState);
    const MINUTE_MS =180000;
    const getData=()=>{
        fetch('https://api.jsonbin.io/b/615188764a82881d6c564066/1', {
            method: 'get'
        })
        .then(response=>response.json())
        .then(data=>{
            setData(data)    
        })
        .catch(function(err) {
            console.log(err)
        });
    }
    useEffect(() => {
        //getData();
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
                            <CWidgetSimple header={data.cards[0].outputLoad.name} text={data.cards[0].outputLoad.value.toString()+" KWh"}>
                            </CWidgetSimple>
                        </CContainer>
                    </CRow>

                    <CRow>
                        <CContainer fluid>
                            <CWidgetSimple header={data.cards[1].totalEnergy.name} text={data.cards[1].totalEnergy.value.toString()+" KWh"}>
                            </CWidgetSimple>
                        </CContainer>
                    </CRow>

                    <CRow>
                        <CContainer fluid>
                            <CWidgetSimple header={data.cards[2].batteryVoltage.name} text={data.cards[2].batteryVoltage.value.toString()+" V"}>
                            </CWidgetSimple>
                        </CContainer>
                    </CRow>

                    <CRow>
                        <CContainer fluid>
                            <CWidgetSimple header={data.cards[3].bisVoltage.name} text={data.cards[3].bisVoltage.value.toString()+" V"}>
                            </CWidgetSimple>
                        </CContainer>
                    </CRow>
                    </CContainer>
                </CCol>
            
                <CCol xs="12" sm="6" lg="9">
                    <CRow>
                    <CContainer fluid>
                        <CWidgetSimple header="title">
                            <Diagram data={data.diagram[0]}/>
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
