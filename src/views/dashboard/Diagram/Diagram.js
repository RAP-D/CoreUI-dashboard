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

const Diagram = ({data})=>{
        return(
             <Xwrapper>   
             <ResizeObserver    
                onResize={useXarrow()}>
                     <CContainer style={{paddingTop:"5rem", paddingBottom:"5rem"}}>
                             <CRow className="justify-content-center">

                                        <CCol xs={1}>
                                                <CContainer>
                                                        <p></p>
                                                </CContainer>
                                        </CCol>
                                        <CCol xs={2}>
                                                <CContainer className="float-left heightadjust">
                                                        <CContainer className="nodeIcon" id="Generation">
                                                                <img className="icon resize" src={SolarPanel} alt="Generation"/><br/>
                                                                <span className="nodeName">Generation</span>
                                                        </CContainer>
                                                </CContainer>
                                        </CCol>

                                        <CCol xs={2}>
                                        </CCol>

                                        <CCol xs={2}>
                                                {/* <CContainer className="line-label1" style={{position:"absolute", bottom:"0"}}> 
                                                        <p style={{color: "#64B42C",fontSize:20}}>{data[0].value} KWh</p>
                                                </CContainer> */}
                                        </CCol> 
                                        <CCol xs={2}>
                                                <CContainer>
                                                        <p></p>
                                                </CContainer>
                                        </CCol>

                                        <CCol xs={2}>
                                        </CCol>

                                        <CCol xs={2}>
                                                <CContainer className="float-right heightadjust">
                                                        <CContainer className="nodeIcon" id="Grid">
                                                                <img className="icon resize" src={PowerTower} alt="Grid"/><br/>
                                                                <span className="nodeName" style={{position:"absolute", top:"4rem", left:"2.5rem"}}>Grid |</span>
                                                                <span className="nodeName" style={{position:"absolute", top:"5rem", left:"1.7rem"}}>Overload</span>
                                                        </CContainer>
                                                </CContainer>
                                        </CCol>
                                        <CCol xs={1}>
                                                <CContainer>
                                                        <p></p>
                                                </CContainer>
                                        </CCol>

                                        <CCol xs={1}>
                                        </CCol>

                                        
                             </CRow>
                             <CRow className="justify-content-center">

                                <CCol xs={3}>
                                        <CContainer>
                                                <p></p>
                                        </CContainer>
                                </CCol>
                                <CCol xs={2}>
                                        <CContainer className="line-label1" style={{position:"absolute", top:"0"}}> 
                                                        <p style={{color: "#64B42C",fontSize:20}}>{data[0].value} KWh</p>
                                        </CContainer>
                                        <CContainer className="line-label3" style={{position:"absolute", bottom:"1rem"}}>
                                                <p style={{color: "#64B42C",fontSize:20}}>{data[2].value} KWh</p>
                                        </CContainer>
                                </CCol>
                                <CCol xs={2}>
                                        <CContainer className="heightadjust">
                                                <img className="icon tower" src={Stortera} alt="StorTower" id="StorTower"/><br/>
                                                <span className="nodeName">Charging</span>
                                        </CContainer>
                                </CCol>
                                <CCol xs={2}>
                                        <CContainer className="line-label2" style={{position:"absolute", top:"0"}}>
                                                        <p style={{color: "#64B42C",fontSize:20}}>{data[1].value} KWh</p>
                                        </CContainer>
                                        <CContainer className="line-label4" style={{position:"absolute", bottom:"1rem"}}>
                                                <p style={{color: "#64B42C",fontSize:20}}>{data[3].value} KWh</p>
                                        </CContainer>
                                </CCol>
                                <CCol xs={3}>
                                        <CContainer>
                                                <p></p>
                                        </CContainer>
                                </CCol> 
                             </CRow>
                             <CRow className="justify-content-center">

                                        <CCol xs={1}>
                                                <CContainer>
                                                        <p></p>
                                                </CContainer>
                                        </CCol>
                                        <CCol xs={2}>
                                                <CContainer className="float-left heightadjust">
                                                
                                                        <CContainer className="nodeIcon" id="Battery">
                                                                <img className="icon resize" src={Battery} alt="Battery"/><br/>
                                                                <span className="nodeName">DSR Loads</span>
                                                        </CContainer>
                                                </CContainer>
                                        </CCol>
                                        <CCol xs={2}>
                                                <CContainer>
                                                        <p></p>
                                                </CContainer>
                                        </CCol>
                                        <CCol xs={2}>
                                                <CContainer>
                                                        <p></p>
                                                </CContainer>
                                        </CCol>
                                        <CCol xs={2}>
                                                <CContainer>
                                                        <p></p>
                                                </CContainer>
                                        </CCol>
                                        <CCol xs={2}>
                                                <CContainer className="float-right heightadjust">
                                                                                                      
                                                        <CContainer className="nodeIcon" id="Home">
                                                                <img className="icon resize" src={Home} alt="Home"/><br/>
                                                                <span className="nodeName">Critical Loads</span>
                                                        </CContainer>
                                                </CContainer>
                                        </CCol>
                                        <CCol xs={1}>
                                                <CContainer>
                                                        <p></p>
                                                </CContainer>
                                        </CCol>
                             </CRow>
                                <Xarrow start={data[0].start} startAnchor= {data[0].startAnchor}  end={data[0].end} endAnchor={data[0].endAnchor} color='#64B42C' path='grid' dashness={{ animation: 1 }}  showHead={false} strokeWidth={data[0].width}/>
                                <Xarrow start={data[1].start} startAnchor= {data[1].startAnchor} end={data[1].end} endAnchor={data[1].endAnchor} color='#64B42C' path='grid' dashness={{ animation: 1 }}  showHead={false} strokeWidth={data[1].width}/>
                                <Xarrow start={data[2].start} startAnchor= {data[2].startAnchor} end={data[2].end} endAnchor={data[2].endAnchor} color='#64B42C' path='grid' dashness={{ animation: 1 }}  showHead={false} strokeWidth={data[2].width}/>
                                <Xarrow start={data[3].start} startAnchor= {data[3].startAnchor} end={data[3].end} endAnchor={data[3].endAnchor} color='#64B42C' path='grid' dashness={{ animation: 1 }}  showHead={false} strokeWidth={data[3].width}/>
                     </CContainer>
                </ResizeObserver>
            </Xwrapper>
        )
    }
export default Diagram;