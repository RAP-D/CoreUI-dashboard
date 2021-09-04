import React  from "react";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import './Diagram.css';
import SolarPanel from './solar-panel.svg';
import PowerTower from './power-tower.svg';
import Stortera from './stortera.svg';
import Battery from './battery-status.svg';
import Home from './lightbulb.svg';
import ResizeObserver from 'rc-resize-observer';
import { CContainer, CRow, CCol } from "@coreui/react";

const Diagram = ()=>{
        return(
             <Xwrapper>   
             <ResizeObserver
                onResize={useXarrow()}>
                     <CContainer>
                             <CRow className="justify-content-center">
                                        <CCol xs={6}>
                                                <CContainer className="float-left heightadjust">
                                                        <CContainer className="nodeIcon" id="Generation">
                                                                <img className="icon resize" src={SolarPanel} alt="Generation"/><br/>
                                                                <span className="nodeName">Generation</span>
                                                        </CContainer>
                                                </CContainer>
                                        </CCol>

                                        

                                        <CCol xs={6}>
                                        <CContainer className="float-right heightadjust">
                                                <CContainer className="nodeIcon" id="Grid">
                                                                <img className="icon resize" src={PowerTower} alt="Grid"/><br/>
                                                                <span className="nodeName">Grid</span>
                                                        </CContainer>
                                                </CContainer>
                                        </CCol>
                                        
                             </CRow>
                             <CRow className="justify-content-center">
                                <CContainer className="heightadjust">
                                        <img className="icon tower" src={Stortera} alt="StorTower" id="StorTower"/><br/>
                                        <span className="nodeName">StorTower</span>
                                </CContainer> 
                             </CRow>
                             <CRow className="justify-content-center">
                                        <CCol xs={6}>
                                        <CContainer className="float-left heightadjust">
                                                        <CContainer className="nodeIcon" id="Battery">
                                                                <img className="icon resize" src={Battery} alt="Battery"/><br/>
                                                                <span className="nodeName">Battery</span>
                                                        </CContainer>
                                                </CContainer>
                                        </CCol>

                                       

                                        <CCol xs={6}>
                                        <CContainer className="float-right heightadjust">
                                                        <CContainer className="nodeIcon" id="Home">
                                                                <img className="icon resize" src={Home} alt="Home"/><br/>
                                                                <span className="nodeName">Home</span>
                                                        </CContainer>
                                                </CContainer>
                                        </CCol>
                             </CRow>
                                <Xarrow start="StorTower" startAnchor= {["right", {position: "left", offset: {y: -20}}]}  end="Generation" endAnchor="bottom" color='#64B42C' path='grid' dashness={{ animation: 1 }}  showHead={false} labels={{start:<div style={{ fontSize: "1.3em", marginRight: "4rem", marginBottom: "2rem",color: "#64B42C"}}>0.00 Kwh</div>}}/>
                                <Xarrow start="StorTower" startAnchor= {["left", {position: "right", offset: {y: -20}}]} end="Grid" endAnchor="bottom" color='#64B42C' path='grid' dashness={{ animation: 1 }}  showHead={false} labels={{start:<div style={{ fontSize: "1.3em", marginLeft: "4rem", marginBottom: "2rem",color: "#64B42C"}}>0.00 Kwh</div>}}/>
                                <Xarrow start="StorTower" startAnchor= {["right", {position: "left", offset: {y: 20}}]} end="Battery" endAnchor="top" color='#64B42C' path='grid' dashness={{ animation: 1 }}  showHead={false} labels={{start:<div style={{ fontSize: "1.3em", marginRight: "4rem", marginTop: "5rem",color: "#64B42C"}}>0.00 Kwh</div>}}/>
                                <Xarrow start="StorTower" startAnchor= {["left", {position: "right", offset: {y: 20}}]} end="Home" endAnchor="top"color='#64B42C' path='grid' dashness={{ animation: 1 }}  showHead={false} labels={{start:<div style={{ fontSize: "1.3em", marginLeft: "4rem", marginTop: "5rem",color: "#64B42C"}}>0.00 Kwh</div>}}/>
                     </CContainer>
                </ResizeObserver>
            </Xwrapper>
        )
    }
export default Diagram;