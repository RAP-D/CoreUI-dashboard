import React  from "react";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import './Diagram.css';
import Generation from './Generation.svg';
import GridHome from './GridHome.svg';
import Stortera from './Stortera.svg';
import DsrLoads from './DsrLoads.svg';
import CriticalLoads from './CriticalLoads.svg';
import ChargingText from './ChargingText.svg'
import ResizeObserver from 'rc-resize-observer';
import { CContainer, CRow, CCol } from "@coreui/react";

const Diagram = ({data})=>{
        return(
             <Xwrapper>   
             <ResizeObserver    
                onResize={useXarrow()}>
                     <CContainer style={{paddingTop:"0rem", paddingBottom:"0rem"}}>
                             <CRow className="justify-content-center">

                                        
                                        <CCol xs={4}>
                                                <CContainer className="float-left heightadjust">
                                                        <span className="nodeName">{parseInt(data.dat[40].val)+parseInt(data.dat[41].val)+" "+data.dat[40].unit}</span><br/>
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
                                                        <span className="nodeName">{data.dat[27].val+" "+data.dat[27].unit}</span><br/>
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
                                                <img className="icon tower" src={ChargingText} alt="Charging"/>
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
                                                        <span className="nodeName">{data.dat[31].val+" "+data.dat[31].unit}</span><br/>
                                                </CContainer>
                                        </CCol>
                             </CRow>
                                <Xarrow start={"Generation"} startAnchor= {"bottom"}  end={"StorTower"} endAnchor={["right", {position: "left", offset: {y: -20}}]} color='#64B42C' path='grid' dashness={{ animation: 1 }}  showHead={false} />
                                <Xarrow start={"Grid"} startAnchor= {"bottom"} end={"StorTower"} endAnchor={["left", {position: "right", offset: {y: -20}}]} color='#64B42C' path='grid' dashness={{ animation: 1 }}  showHead={false} />
                                <Xarrow start={"DsrLoads"} startAnchor= {"top"} end={"StorTower"} endAnchor={["right", {position: "left", offset: {y: 20}}]} color='#64B42C' path='grid' dashness={{ animation: 1 }}  showHead={false}/>
                                <Xarrow start={"CriticalLoads"} startAnchor= {"top"} end={"StorTower"} endAnchor={["left", {position: "right", offset: {y: 20}}]} color='#64B42C' path='grid' dashness={{ animation: 1 }}  showHead={false} />
                     </CContainer>
                </ResizeObserver>
            </Xwrapper>
        )
    }
export default Diagram;