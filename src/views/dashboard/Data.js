import {
    CCol,
    CRow,
    CWidgetSimple,
    CContainer,
    CCard,
    CCardBody,
  CCardGroup,
  CCardHeader,  
  CListGroup,
  CListGroupItem,
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
    const MINUTE_MS =180000;
    
    const getData = () => {
        fetch('https://traicon.stortera.com/api/token/refresh',{
            method: "post",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                username: "powerforward",
                password: "VoMlJevkd3e3NUcx2ntMZA"
            })
        })
        .then(response=>response.json())
        .then(data=>{
            fetch('https://traicon.stortera.com/api/inverter/operate/B3E19380158221/1/data-last',{
                method: "get",
                headers: {'Authorization': `Bearer ${data.access_token}`}
            })
            .then(response=>response.json())
            .then(data=>{
                    console.log(data);
            })
        }) 

    //     .then(data=>{
    //         console.log(data);
    //         data.diagram.forEach((element,i) => {
    //             if(element.direction==='no'){
    //                 data.diagram[i].width=0;
    //                 data.diagram[i].start="StorTower";
    //                 data.diagram[i].end=element.name;
    //                 switch(i){
    //                     case 0:
    //                         data.diagram[i].startAnchor = ["right", {position: "left", offset: {y: -20}}];
    //                         data.diagram[i].endAnchor ="bottom";
    //                         break;
    //                     case 1:
    //                         data.diagram[i].startAnchor = ["left", {position: "right", offset: {y: -20}}];
    //                         data.diagram[i].endAnchor ="bottom";
    //                         break;
    //                     case 2:
    //                         data.diagram[i].startAnchor = ["right", {position: "left", offset: {y: 20}}];
    //                         data.diagram[i].endAnchor ="top";
    //                         break;
    //                     default:
    //                         data.diagram[i].startAnchor = ["left", {position: "right", offset: {y: 20}}];
    //                         data.diagram[i].endAnchor ="top";
    //                         break;
    //                 }
    //             }else if(element.direction==='in'){
    //                 data.diagram[i].width=4;
    //                 data.diagram[i].start=element.name;
    //                 data.diagram[i].end="StorTower"
    //                 switch(i){
    //                     case 0:
    //                         data.diagram[i].startAnchor ="bottom";
    //                         data.diagram[i].endAnchor = ["right", {position: "left", offset: {y: -20}}];
    //                         break;
    //                     case 1:
    //                         data.diagram[i].startAnchor ="bottom";
    //                         data.diagram[i].endAnchor = ["left", {position: "right", offset: {y: -20}}]
    //                         break;
    //                     case 2:
    //                         data.diagram[i].startAnchor ="top";
    //                         data.diagram[i].endAnchor = ["right", {position: "left", offset: {y: 20}}]
    //                         break;
    //                     default:
    //                         data.diagram[i].startAnchor ="top";
    //                         data.diagram[i].endAnchor = ["left", {position: "right", offset: {y: 20}}]
    //                         break;
    //                 }
    //             }else{
    //                 data.diagram[i].width=4;
    //                 data.diagram[i].start="StorTower";
    //                 data.diagram[i].end=element.name;
    //                 switch(i){
    //                     case 0:
    //                         data.diagram[i].startAnchor = ["right", {position: "left", offset: {y: -20}}];
    //                         data.diagram[i].endAnchor ="bottom";
    //                         break;
    //                     case 1:
    //                         data.diagram[i].startAnchor = ["left", {position: "right", offset: {y: -20}}];
    //                         data.diagram[i].endAnchor ="bottom";
    //                         break;
    //                     case 2:
    //                         data.diagram[i].startAnchor = ["right", {position: "left", offset: {y: 20}}];
    //                         data.diagram[i].endAnchor ="top";
    //                         break;
    //                     default:
    //                         data.diagram[i].startAnchor = ["left", {position: "right", offset: {y: 20}}];
    //                         data.diagram[i].endAnchor ="top";
    //                         break;
    //                 }
    //             }
    //         })
    //         setData(data)  
    //     })
    //     .catch(function(err) {
    //         console.log(err)
    //     });
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
                <CCol xs="12" sm="6" lg="5">
                    {/* <CContainer className="cardContainer">
                    <CRow>
                        <CContainer fluid className="align-self-center">
                            <strong style={{fontSize: 'medium'}}>Statistical data</strong>
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
                    </CContainer> */}
                    <CCard>
                        <CCardHeader className="card text-center" style={{fontWeight:"bold"}}>PV & Battery</CCardHeader>
                        <CCardBody style={{padding:5}}>
                            <CListGroup>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >Battery Voltage</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>53V</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >Battery Status</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>53V</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >PV Input Voltage 1</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>53V</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >PV Input Voltage 2</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>53V</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >PV Power</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>53V</CCol>
                                    </CRow>
                                </CListGroupItem>
                            </CListGroup>
                        </CCardBody>
                    </CCard>
                    <CCard>
                        <CCardHeader className="card text-center" style={{fontWeight:"bold"}}>GRID</CCardHeader>
                        <CCardBody style={{padding:5}}>
                            <CListGroup>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >Grid Voltage</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>53V</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >Grid Power (Import/Export)</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>53V</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >Grid Frequency</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>53V</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >Grid Current</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>53V</CCol>
                                    </CRow>
                                </CListGroupItem>
                            </CListGroup>
                        </CCardBody>
                    </CCard>
                    <CCard>
                        <CCardHeader className="card text-center" style={{fontWeight:"bold"}}>System Output</CCardHeader>
                        <CCardBody style={{padding:5}}>
                            <CListGroup>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >System Output Voltage</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>53V</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >System Output Frequency</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>53V</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >System Output Current</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>53V</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >System Output Load Percentage</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>53V</CCol>
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
                            <Diagram data={data.diagram}/>
                        </CWidgetSimple> 
                    </CContainer>
                    </CRow>
                    <CCard>
                        <CCardHeader className="card text-center" style={{fontWeight:"bold"}}>System Output</CCardHeader>
                        <CCardBody style={{padding:5}}>
                            <CListGroup>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >System Output Voltage</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>53V</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >System Output Frequency</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>53V</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >System Output Current</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>53V</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >System Output Load Percentage</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>53V</CCol>
                                    </CRow>
                                </CListGroupItem>
                            </CListGroup>
                        </CCardBody>
                    </CCard>
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
