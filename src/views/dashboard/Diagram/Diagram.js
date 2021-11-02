import React  from "react";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import './Diagram.css';
import Generation from './Generation.svg';
import GridHome from './GridHome.svg';
import Stortera from './StorteraFlow.svg';
import DsrLoads from './DsrLoads.svg';
import CriticalLoads from './CriticalLoads.svg';
import ResizeObserver from 'rc-resize-observer';
import { CContainer, CRow, CCol } from "@coreui/react";

const Diagram = ({data,generationLine,gridHomeLine,dsrLoadsLine,criticalLoadsLine})=>{
        return(
             <Xwrapper>   
             <ResizeObserver    
                onResize={useXarrow()}>
                     <CContainer style={{paddingTop:"0rem", paddingBottom:"0rem"}}>
                             <CRow className="justify-content-center">

                                        
                                        <CCol xs={4}>
                                                <CContainer className="float-left heightadjust" style={{paddingTop:'1rem'}}>
                                                        <span className="nodeName" style={{fontSize:"1.3rem"}}>{data.PVPower}</span><br/>
                                                        <CContainer className="nodeIcon" id="Generation">
                                                                <img className="icon resize" src={Generation} alt="Generation"/><br/> 
                                                        </CContainer>
                                                </CContainer>
                                        </CCol>
                                        <CCol xs={4}>
                                                <CContainer>
                                                        <p></p>
                                                </CContainer>
                                        </CCol>
                                        <CCol xs={4}>
                                                <CContainer className="float-right heightadjust" style={{paddingTop:'1rem'}}>
                                                        <span className="nodeName" style={{fontSize:"1.3rem"}}>{data.gridPower}</span><br/>
                                                        <CContainer className="nodeIcon" id="Grid">
                                                                <img className="icon resize" src={GridHome} alt="Grid Home"/><br/>
                                                        </CContainer>
                                                </CContainer>
                                        </CCol>

                                        
                             </CRow>
                             <CRow className="justify-content-center">

                                <CCol xs={4}>
                                        <CContainer>
                                                <p></p>
                                        </CContainer>
                                </CCol>
                                <CCol xs={4}>
                                        <CContainer className="heightadjust">
                                                <h1 style={{fontSize:25}}><strong>StorTower</strong></h1>
                                                <img className="icon tower" src={Stortera} alt="StorTower" id="StorTower"/><br/>
                                                <h1 style={{fontSize:20}}><strong>{data.batteryStatus}</strong></h1>
                                        </CContainer>
                                </CCol>
                                <CCol xs={4}>
                                        <CContainer>
                                                <p></p>
                                        </CContainer>
                                </CCol>
                                
                             </CRow>
                             <CRow className="justify-content-center">

                                        <CCol xs={4}>
                                                <CContainer className="float-left heightadjust" style={{paddingBottom:'1rem'}}>
                                                        <CContainer className="nodeIcon" id="DsrLoads">
                                                                <img className="icon resize" src={DsrLoads} alt="Dsr Loads"/><br/>
                                                        </CContainer>
                                                        <span className="nodeName" style={{fontSize:"1.3rem"}}>0 W</span><br/>
                                                </CContainer>
                                        </CCol>
                                        
                                        <CCol xs={4}>
                                                <CContainer>
                                                        <p></p>
                                                </CContainer>
                                        </CCol>
                                        <CCol xs={4}>
                                                <CContainer className="float-right heightadjust" style={{paddingBottom:'1rem'}}>                                                     
                                                        <CContainer className="nodeIcon" id="CriticalLoads">
                                                                <img className="icon resize" src={CriticalLoads} alt="Critical Loads"/><br/>
                                                        </CContainer>
                                                        <span className="nodeName" style={{fontSize:"1.3rem"}}>{data.systemOutputPower}</span><br/>
                                                </CContainer>
                                        </CCol>
                             </CRow>
                                {generationLine.showXarrow ? <Xarrow start={"Generation"} end={"StorTower"} startAnchor={"bottom"} endAnchor={["right", {position: "left", offset: {y: -20}}]}  color={generationLine.color} path='grid' dashness={{ animation: generationLine.animation }}  showHead={generationLine.showHead} showTail={generationLine.showTail} />:null}
                                {gridHomeLine.showXarrow ? <Xarrow start={"Grid"}end={"StorTower"} startAnchor={"bottom"} endAnchor={["left", {position: "right", offset: {y: -20}}]} color={gridHomeLine.color} path='grid' dashness={{ animation: gridHomeLine.animation }}  showHead={gridHomeLine.showHead} showTail={gridHomeLine.showTail} />:null}
                                {dsrLoadsLine.showXarrow ? <Xarrow start={"StorTower"} end={"DsrLoads"} startAnchor={["right", {position: "left", offset: {y: 20}}]} endAnchor={"top"} color={dsrLoadsLine.color} path='grid' dashness={{ animation: dsrLoadsLine.animation }}  showHead={dsrLoadsLine.showHead} showTail={dsrLoadsLine.showTail}/>:null}
                                {criticalLoadsLine.showXarrow? <Xarrow start={"StorTower"} end={"CriticalLoads"} startAnchor={["left", {position: "right", offset: {y: 20}}]} endAnchor={"top"} color={criticalLoadsLine.color} path='grid' dashness={{ animation: criticalLoadsLine.animation }}  showHead={criticalLoadsLine.showHead} showTail={criticalLoadsLine.showTail} />:null}
                     </CContainer>
                </ResizeObserver>
            </Xwrapper>
        )
    }
export default Diagram;