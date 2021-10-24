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
import './Data.css'
import { useEffect,useState } from 'react';
import { CSVLink } from 'react-csv';

const Data = () => {
    const initialDataState={
        dat:[
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
            {title:'',unit:'',val:''},
        ]
    }
    const [data, setData] = useState(initialDataState);
    const [generationLine, setGenerationLine] = useState({start:'',end:'',startAnchor:'',endAnchor:'',width:0});
    const [gridHomeLine, setGridHomeLine] = useState({start:'',end:'',startAnchor:'',endAnchor:'',width:0});
    const [dsrLoadsLine, setDsrLoadsLine] = useState({start:'',end:'',startAnchor:'',endAnchor:'',width:0});
    const [criticalLoadsLine, setCriticalLoadsLine] = useState({start:'',end:'',startAnchor:'',endAnchor:'',width:0});
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
                setData(data)
                if(parseFloat(data.dat[40].val)+parseFloat(data.dat[41].val)===0){//for generation to stortera line
                    setGenerationLine({start:"Generation",end:"StorTower",startAnchor:"bottom",endAnchor:["right", {position: "left", offset: {y: -20}}],width:0})
                }else{
                    setGenerationLine({start:"Generation",end:"StorTower",startAnchor:"bottom",endAnchor:["right", {position: "left", offset: {y: -20}}],width:4})
                }

                if(parseFloat(data.dat[27].val)>0){//for gridHome to stortera line
                    setGridHomeLine({start:"Grid",end:"StorTower",startAnchor:"bottom",endAnchor:["left", {position: "right", offset: {y: -20}}],width:4})   
                }else if(parseFloat(data.dat[27].val)===0){
                    setGridHomeLine({start:"Grid",end:"StorTower",startAnchor:"bottom",endAnchor:["left", {position: "right", offset: {y: -20}}],width:0})
                }else{
                    setGridHomeLine({start:"StorTower",end:"Grid",startAnchor:["left", {position: "right", offset: {y: -20}}],endAnchor:"bottom",width:4})
                }
                //for dsrLoads to stortera line
                setDsrLoadsLine({start:"StorTower",end:"DsrLoads",startAnchor:["right", {position: "left", offset: {y: 20}}],endAnchor:"top",width:4})
                //for criticalLoads to stortera line
                if(parseFloat(data.dat[31].val)===0){
                    setCriticalLoadsLine({start:"StorTower",end:"CriticalLoads",startAnchor:["left", {position: "right", offset: {y: 20}}],endAnchor:"top",width:0})
                }else{
                    setCriticalLoadsLine({start:"StorTower",end:"CriticalLoads",startAnchor:["left", {position: "right", offset: {y: 20}}],endAnchor:"top",width:4})
                }

            }).catch(err=>{
                console.log(err)
            })
        }).catch(err=>{
            console.log(err)
        }) 
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
                    <CCard>
                        <CCardHeader className="card text-center" style={{fontWeight:"bold"}}>PV & Battery</CCardHeader>
                        <CCardBody style={{padding:5}}>
                            <CListGroup>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >Battery Voltage</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.dat[37].val+" "+data.dat[37].unit}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >Battery Status</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.dat[47].val}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >PV Input Voltage 1</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.dat[43].val+" "+data.dat[43].unit}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >PV Input Voltage 2</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.dat[44].val+" "+data.dat[44].unit}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >PV Power</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{(parseInt(data.dat[40].val)+parseInt(data.dat[41].val))+" "+data.dat[40].unit}</CCol>
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
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.dat[26].val+" "+data.dat[26].unit}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >Grid Power (Import/Export)</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.dat[27].val+" "+data.dat[27].unit}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >Grid Frequency</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.dat[28].val+" "+data.dat[28].unit}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >Grid Current</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.dat[29].val+" "+data.dat[29].unit}</CCol>
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
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.dat[30].val+" "+data.dat[30].unit}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >System Output Frequency</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.dat[31].val+" "+data.dat[31].unit}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >System Output Current</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.dat[32].val+" "+data.dat[32].unit}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >System Output Load Percentage</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.dat[33].val+" "+data.dat[33].unit}</CCol>
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
                            <Diagram data={data} generationLine={generationLine} gridHomeLine={gridHomeLine} dsrLoadsLine={dsrLoadsLine} criticalLoadsLine={criticalLoadsLine}/>
                        </CWidgetSimple> 
                    </CContainer>
                    </CRow>
                    {/*<CCard>
                        <CCardHeader className="card text-center" style={{fontWeight:"bold"}}>LOADS</CCardHeader>
                        <CCardBody style={{padding:5}}>
                            <CListGroup>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >CRITICAL LOAD POWER</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>53V</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >CRITICAL LOAD POWER</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>53V</CCol>
                                    </CRow>
                                </CListGroupItem>
                            </CListGroup>
                        </CCardBody>
                    </CCard>*/}
                    <CRow>
                    <CCol xs="auto" className="me-auto"></CCol>
                    <CCol xs="auto">
                        <CContainer className="float-right p-0">
                        <CSVLink data={data.dat} target="_blank" className="btn btn-dark" filename={"Datasheet.csv"}>
                            <CRow>
                            <i className="material-icons md-18 plus_icon" >cloud_download</i>
                                <CContainer>Download</CContainer>
                            </CRow>
                        </CSVLink>
                        </CContainer>
                    </CCol>
                        
                    </CRow>
                </CCol>   
            </CRow>
        </>
    )
}

export default Data;
