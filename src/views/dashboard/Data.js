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
                name:"Output Load",
                value: 0.00
            },{
                name:"Total Energy",
                value: 0.00
            },{
                name:"Battery Voltage",
                value: 0.00
            },{
                name:"BUS Voltage",
                value: 0.00
            }
        ],
        diagram: [{
                value: 0.00,
                start:"",
                end:"",
                startAnchor:"",
                endAnchor:"",
                style:{},
                width:0,
            },{
                value: 0.00,
                start:"",
                end:"",
                startAnchor:"",
                endAnchor:"",
                style:{},
                width:0,
            },{
                name:"Battery",
                start:"",
                end:"",
                startAnchor:"",
                endAnchor:"",
                style:{},
                width:0,
                value: 0.00
            },{
                name:"Home",
                start:"",
                end:"",
                startAnchor:"",
                endAnchor:"",
                style:{},
                width:0,
                value: 0.00
            }
        ]
    }
    const [data, setData] = useState(initialState);
    const MINUTE_MS =3000;
    

    const prosessData = (data) => {
        const prosessedData=data;
        data.diagram.forEach((element,i) => {
            if(element.direction==='no'){
                prosessedData.diagram[i].width=0;
                prosessedData.diagram[i].start="StorTower";
                prosessedData.diagram[i].end=element.name;
                switch(i){
                    case 0:
                        prosessedData.diagram[i].startAnchor = ["right", {position: "left", offset: {y: -20}}];
                        prosessedData.diagram[i].endAnchor ="bottom";
                        prosessedData.diagram[i].style = { fontSize: "1.3em", marginRight: "4rem", marginBottom: "2rem",color: "#64B42C"}
                        break;
                    case 1:
                        prosessedData.diagram[i].startAnchor = ["left", {position: "right", offset: {y: -20}}];
                        prosessedData.diagram[i].endAnchor ="bottom";
                        prosessedData.diagram[i].style = { fontSize: "1.3em", marginLeft: "4rem", marginBottom: "2rem",color: "#64B42C"};
                        break;
                    case 2:
                        prosessedData.diagram[i].startAnchor = ["right", {position: "left", offset: {y: 20}}];
                        prosessedData.diagram[i].endAnchor ="top";
                        prosessedData.diagram[i].style = { fontSize: "1.3em", marginRight: "4rem", marginTop: "4rem",color: "#64B42C"}
                        break;
                    default:
                        prosessedData.diagram[i].startAnchor = ["left", {position: "right", offset: {y: 20}}];
                        prosessedData.diagram[i].endAnchor ="top";
                        prosessedData.diagram[i].style ={ fontSize: "1.3em", marginLeft: "4rem", marginTop: "4rem",color: "#64B42C"}
                        break;
                }
            }else if(element.direction==='in'){
                prosessedData.diagram[i].width=4;
                prosessedData.diagram[i].start=element.name;
                prosessedData.diagram[i].end="StorTower"
                switch(i){
                    case 0:
                        prosessedData.diagram[i].startAnchor ="bottom";
                        prosessedData.diagram[i].endAnchor = ["right", {position: "left", offset: {y: -20}}];
                        prosessedData.diagram[i].style = { fontSize: "1.3em", marginLeft: "20.05rem", marginTop: "5.4rem",color: "#64B42C"}
                        break;
                    case 1:
                        prosessedData.diagram[i].startAnchor ="bottom";
                        prosessedData.diagram[i].endAnchor = ["left", {position: "right", offset: {y: -20}}]
                        prosessedData.diagram[i].style ={ fontSize: "1.3em", marginRight: "20.05rem", marginTop: "5.4rem",color: "#64B42C"}
                        break;
                    case 2:
                        prosessedData.diagram[i].startAnchor ="top";
                        prosessedData.diagram[i].endAnchor = ["right", {position: "left", offset: {y: 20}}]
                        prosessedData.diagram[i].style = { fontSize: "1.3em", marginLeft: "20.05rem", marginBottom: "5.4rem",color: "#64B42C"}
                        break;
                    default:
                        prosessedData.diagram[i].startAnchor ="top";
                        prosessedData.diagram[i].endAnchor = ["left", {position: "right", offset: {y: 20}}]
                        prosessedData.diagram[i].style = { fontSize: "1.3em", marginRight: "20.05rem", marginBottom: "5.4rem",color: "#64B42C"};
                        break;
                }
            }else{
                prosessedData.diagram[i].width=4;
                prosessedData.diagram[i].start="StorTower";
                prosessedData.diagram[i].end=element.name;
                switch(i){
                    case 0:
                        prosessedData.diagram[i].startAnchor = ["right", {position: "left", offset: {y: -20}}];
                        prosessedData.diagram[i].endAnchor ="bottom";
                        prosessedData.diagram[i].style = { fontSize: "1.3em", marginRight: "4rem", marginBottom: "2rem",color: "#64B42C"}
                        break;
                    case 1:
                        prosessedData.diagram[i].startAnchor = ["left", {position: "right", offset: {y: -20}}];
                        prosessedData.diagram[i].endAnchor ="bottom";
                        prosessedData.diagram[i].style = { fontSize: "1.3em", marginLeft: "4rem", marginBottom: "2rem",color: "#64B42C"};
                        break;
                    case 2:
                        prosessedData.diagram[i].startAnchor = ["right", {position: "left", offset: {y: 20}}];
                        prosessedData.diagram[i].endAnchor ="top";
                        prosessedData.diagram[i].style = { fontSize: "1.3em", marginRight: "4rem", marginTop: "4rem",color: "#64B42C"}
                        break;
                    default:
                        prosessedData.diagram[i].startAnchor = ["left", {position: "right", offset: {y: 20}}];
                        prosessedData.diagram[i].endAnchor ="top";
                        prosessedData.diagram[i].style ={ fontSize: "1.3em", marginLeft: "4rem", marginTop: "4rem",color: "#64B42C"}
                        break;
                }
            }
        })
        setData(prosessedData);
    }
    const getData = () => {
        fetch('http://localhost:3000/', {
            method: 'get'
        })
        .then(response=>response.json())
        .then(data=>{
            prosessData(data)  
        })
        .catch(function(err) {
            console.log(err)
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
                            <CWidgetSimple header={data.cards[0].name} text={data.cards[0].value.toString()+" KWh"}>
                            </CWidgetSimple>
                        </CContainer>
                    </CRow>

                    <CRow>
                        <CContainer fluid>
                            <CWidgetSimple header={data.cards[1].name} text={data.cards[1].value.toString()+" KWh"}>
                            </CWidgetSimple>
                        </CContainer>
                    </CRow>

                    <CRow>
                        <CContainer fluid>
                            <CWidgetSimple header={data.cards[2].name} text={data.cards[2].value.toString()+" V"}>
                            </CWidgetSimple>
                        </CContainer>
                    </CRow>

                    <CRow>
                        <CContainer fluid>
                            <CWidgetSimple header={data.cards[3].name} text={data.cards[3].value.toString()+" V"}>
                            </CWidgetSimple>
                        </CContainer>
                    </CRow>
                    </CContainer>
                </CCol>
            
                <CCol xs="12" sm="6" lg="9">
                    <CRow>
                    <CContainer fluid>
                        <CWidgetSimple header="title">
                            <Diagram data={data.diagram}/>
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
