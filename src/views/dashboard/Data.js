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
    const initialData={
            gridVoltage:'0 V',
            gridPower:'0 W',
            gridFrequency:'0 Hz',
            gridCurrent:'0 A',
            systemOutputVoltage:'0 W',
            systemOutputPower:'0 W',
            systemOutputFrequency:'0 HZ',
            systemOutputCurrent:'0 A',
            systemOutputLoadPercentage:'0 %',
            batteryVoltage:'0 V',
            batteryStatus:'Unknown',
            PVInputVoltage1:'0 V',
            PVInputVoltage2:'0 V',
            PVPower:'0 V',
    }
    const [data, setData] = useState(initialData);
    const [generationLine, setGenerationLine] = useState({start:'',end:'',startAnchor:'',endAnchor:'',width:0});
    const [gridHomeLine, setGridHomeLine] = useState({start:'',end:'',startAnchor:'',endAnchor:'',width:0});
    const [dsrLoadsLine, setDsrLoadsLine] = useState({start:'',end:'',startAnchor:'',endAnchor:'',width:0});
    const [criticalLoadsLine, setCriticalLoadsLine] = useState({start:'',end:'',startAnchor:'',endAnchor:'',width:0});
    const MINUTE_MS =180000;
    const id=window.location.href.split('/').lastItem
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
            fetch(`https://traicon.stortera.com/api/inverter/operate/${window.location.href.split('/').lastItem}/1/data-last`,{
                method: "get",
                headers: {'Authorization': `Bearer ${data.access_token}`}
            })
            .then(response=>response.json())
            .then(data=>{
                const pvPower=parseFloat(data.dat[40].val)+parseFloat(data.dat[41].val)
                const gridPower=parseFloat(data.dat[27].val)
                const systemOutputPower=parseFloat(data.dat[31].val)
                setData({
                    gridVoltage:data.dat[26].val+" "+data.dat[26].unit,
                    gridPower:gridPower+" "+data.dat[27].unit,
                    gridFrequency:data.dat[28].val+" "+data.dat[28].unit,
                    gridCurrent:data.dat[29].val+" "+data.dat[29].unit,
                    systemOutputVoltage:data.dat[30].val+" "+data.dat[30].unit,
                    systemOutputPower:systemOutputPower+" "+data.dat[31].unit,
                    systemOutputFrequency:data.dat[32].val+" "+data.dat[32].unit,
                    systemOutputCurrent:data.dat[33].val+" "+data.dat[33].unit,
                    systemOutputLoadPercentage:data.dat[34].val+" "+data.dat[34].unit,
                    batteryVoltage:data.dat[37].val+" "+data.dat[37].unit,
                    batteryStatus:data.dat[47].val,
                    PVInputVoltage1:data.dat[43].val+" "+data.dat[43].unit,
                    PVInputVoltage2:data.dat[44].val+" "+data.dat[44].unit,
                    PVPower:pvPower+" "+data.dat[40].unit,
                })
                if(pvPower===0){//for generation to stortera line
                    setGenerationLine({start:"Generation",end:"StorTower",startAnchor:"bottom",endAnchor:["right", {position: "left", offset: {y: -20}}],width:0 ,showXarrow:true ,animation:0 ,showHead:false,showTail:false})
                }else if(pvPower>0){
                    setGenerationLine({start:"Generation",end:"StorTower",startAnchor:"bottom",endAnchor:["right", {position: "left", offset: {y: -20}}],width:4 ,showXarrow:true ,animation:1 ,showHead:true,showTail:false})
                }else{
                    setGenerationLine({start:"Generation",end:"StorTower",startAnchor:"bottom",endAnchor:["right", {position: "left", offset: {y: -20}}],width:4 ,showXarrow:true ,animation:-1 ,showHead:false,showTail:true})
                }

                if(gridPower>0){//for gridHome to stortera line
                    setGridHomeLine({start:"Grid",end:"StorTower",startAnchor:"bottom",endAnchor:["left", {position: "right", offset: {y: -20}}],width:4 ,showXarrow:true ,animation:1 ,showHead:true,showTail:false})   
                }else if(gridPower===0){
                    setGridHomeLine({start:"Grid",end:"StorTower",startAnchor:"bottom",endAnchor:["left", {position: "right", offset: {y: -20}}],width:0 ,showXarrow:true ,animation:0 ,showHead:false,showTail:false})
                }else{
                    setGridHomeLine({start:"Grid",end:"StorTower",startAnchor:"bottom",endAnchor:["left", {position: "right", offset: {y: -20}}],width:4 ,showXarrow:true ,animation:-1 ,showHead:false,showTail:true})
                }
                //for dsrLoads to stortera line
                setDsrLoadsLine({start:"StorTower",end:"DsrLoads",startAnchor:["right", {position: "left", offset: {y: 20}}],endAnchor:"top",width:0})
                //for criticalLoads to stortera line
                if(systemOutputPower===0){
                    setCriticalLoadsLine({start:"StorTower",end:"CriticalLoads",startAnchor:["left", {position: "right", offset: {y: 20}}],endAnchor:"top",width:0 ,showXarrow:true ,animation:0 ,showHead:false,showTail:false})
                }else if(systemOutputPower>0){
                    setCriticalLoadsLine({start:"StorTower",end:"CriticalLoads",startAnchor:["left", {position: "right", offset: {y: 20}}],endAnchor:"top",width:4 ,showXarrow:true ,animation:-1 ,showHead:true,showTail:false})
                }else{
                    setCriticalLoadsLine({start:"StorTower",end:"CriticalLoads",startAnchor:["left", {position: "right", offset: {y: 20}}],endAnchor:"top",width:4 ,showXarrow:true ,animation:1 ,showHead:false,showTail:true})
                }

            }).catch(err=>{
                console.log(err)
            })
        }).catch(err=>{
            console.log(err)
        }) 
     }
    useEffect(() => {
        setData({
            gridVoltage:'0 V',
            gridPower:'0 W',
            gridFrequency:'0 Hz',
            gridCurrent:'0 A',
            systemOutputVoltage:'0 W',
            systemOutputPower:'0 W',
            systemOutputFrequency:'0 HZ',
            systemOutputCurrent:'0 A',
            systemOutputLoadPercentage:'0 %',
            batteryVoltage:'0 V',
            batteryStatus:'Unknown',
            PVInputVoltage1:'0 V',
            PVInputVoltage2:'0 V',
            PVPower:'0 V',
        })
        setGenerationLine({start:'',end:'',startAnchor:'',endAnchor:'',width:0})
        setGridHomeLine({start:'',end:'',startAnchor:'',endAnchor:'',width:0})
        setDsrLoadsLine({start:'',end:'',startAnchor:'',endAnchor:'',width:0})
        setCriticalLoadsLine({start:'',end:'',startAnchor:'',endAnchor:'',width:0})
        getData();
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
                        <CCardHeader className="card text-center" style={{fontWeight:"bold"}}>PV & Battery</CCardHeader>
                        <CCardBody style={{padding:5}}>
                            <CListGroup>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >Battery Voltage</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.batteryVoltage}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >Battery Status</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.batteryStatus}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >PV Input Voltage 1</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.PVInputVoltage1}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >PV Input Voltage 2</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.PVInputVoltage2}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >PV Power</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.PVPower}</CCol>
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
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.gridVoltage}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >Grid Power (Import/Export)</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.gridPower}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >Grid Frequency</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.gridFrequency}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >Grid Current</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.gridCurrent}</CCol>
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
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.systemOutputVoltage}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >System Output Frequency</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.systemOutputFrequency}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >System Output Current</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.systemOutputCurrent}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >System Output Load Percentage</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.systemOutputLoadPercentage}</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem style={{fontSize:12, padding:5}}>
                                    <CRow>
                                        <CCol xs="6" sm="6" lg="6" >System Output Power</CCol>
                                        <CCol xs="6" sm="6" lg="6" style={{textAlign:'center'}}>{data.systemOutputPower}</CCol>
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
                        <CSVLink data={[data]} target="_blank" className="btn btn-dark" filename={"Datasheet.csv"}>
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
