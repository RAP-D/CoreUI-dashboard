import React  from "react";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import './Diagram.css';
import Generation from './Generation.svg';
import GridHome from './GridHome.svg';
import Stortera from './Generation.svg';
import DsrLoads from './DsrLoads.svg';
import CriticalLoads from './CriticalLoads.svg';
import ChargingText from './ChargingText.svg'
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
                                                <CContainer className="float-left heightadjust">
                                                        <span className="nodeName">{data.PVPower}</span><br/>
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
                                                <CContainer className="float-right heightadjust">
                                                        <span className="nodeName">{data.gridPower}</span><br/>
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
                                                <img className="icon tower" src={Stortera} alt="StorTower" id="StorTower"/><br/>
                                                <img className="icon towername" src={ChargingText} alt="Charging"/>
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
                                                <CContainer className="float-left heightadjust">
                                                        <CContainer className="nodeIcon" id="DsrLoads">
                                                                <img className="icon resize" src={DsrLoads} alt="Dsr Loads"/><br/>
                                                        </CContainer>
                                                        <span className="nodeName">0 W</span><br/>
                                                </CContainer>
                                        </CCol>
                                        
                                        <CCol xs={4}>
                                                <CContainer>
                                                        <p></p>
                                                </CContainer>
                                        </CCol>
                                        <CCol xs={4}>
                                                <CContainer className="float-right heightadjust">                                                     
                                                        <CContainer className="nodeIcon" id="CriticalLoads">
                                                                <img className="icon resize" src={CriticalLoads} alt="Critical Loads"/><br/>
                                                        </CContainer>
                                                        <span className="nodeName">{data.systemOutputPower}</span><br/>
                                                </CContainer>
                                        </CCol>
                             </CRow>
                                <Xarrow start={generationLine.start} startAnchor= {generationLine.startAnchor}  end={generationLine.end} endAnchor={generationLine.endAnchor} strokeWidth={generationLine.width} color='#64B42C' path='grid' dashness={{ animation: 1 }}  showHead={true} />
                                <Xarrow start={gridHomeLine.start} startAnchor= {gridHomeLine.startAnchor}  end={gridHomeLine.end} endAnchor={gridHomeLine.endAnchor} strokeWidth={gridHomeLine.width} color='#64B42C' path='grid' dashness={{ animation: 1 }}  showHead={true} />
                                <Xarrow start={dsrLoadsLine.start} startAnchor= {dsrLoadsLine.startAnchor}  end={dsrLoadsLine.end} endAnchor={dsrLoadsLine.endAnchor} strokeWidth={dsrLoadsLine.width} color='#64B42C' path='grid' dashness={{ animation: 1 }}  showHead={true}/>
                                <Xarrow start={criticalLoadsLine.start} startAnchor= {criticalLoadsLine.startAnchor}  end={criticalLoadsLine.end} endAnchor={criticalLoadsLine.endAnchor} strokeWidth={criticalLoadsLine.width} color='#64B42C' path='grid' dashness={{ animation: 1 }}  showHead={true} />
                     </CContainer>
                </ResizeObserver>
            </Xwrapper>
        )
    }
export default Diagram;