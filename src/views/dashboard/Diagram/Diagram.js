import React from "react";
import Xarrow, { useXarrow } from "react-xarrows";
import './Diagram.css';
import SolarPanel from './solar-panel.svg';
import PowerTower from './power-tower.svg';
import Stortera from './stortera.svg';
import Battery from './battery-status.svg';
import Home from './lightbulb.svg';

const Diagram = ()=>{
        return(
            <div onLoad={useXarrow()} className="bulma-col columns is-2 is-multiline is-mobile">
                <div className="column  is-4">
                        <center>
                        <div className="heightadjust">
                                <div className = "nodeIcon" id="Generation">
                                        <img className="icon loku" src={SolarPanel} alt="Generation"/>
                                        <div className="nodename">Generation</div>
                                </div>
                        </div>
                        </center>
                </div>
                <div className="column is-4"></div>

                <div className="column is-4">
                        <center>
                        <div className="heightadjust">
                                <div className = "nodeIcon" id="Grid">
                                        <img className="icon loku" src={PowerTower} alt="Grid"/>
                                        <div className="nodename">Grid</div>
                                </div>
                        </div>
                        </center>
                </div>
                <div className="column is-4"></div>

                <div className="column is-4">
                        <img className="icon tower" src={Stortera} alt="StorTower" id="StorTower"/>
                        <div>StorTower</div>
                </div>
                <div className="column is-4"></div>

                <div className="column is-4">
                        <center>
                        <div className="heightadjust">
                                <div className = "nodeIcon" id="Battery">
                                        <img className="icon loku" src={Battery} alt="Battery"/>
                                        <div className="nodename">Battery</div>
                                </div>
                        </div>
                        </center>
                </div>
                <div className="column is-4"></div>
                
                <div className="column is-4">
                        <center>
                        <div className="heightadjust">
                                <div className = "nodeIcon" id="Home">
                                        <img className="icon loku" src={Home} alt="Home"/>
                                        <div className="nodename">Home</div>
                                </div>
                        </div>
                        </center>
                </div>
                <Xarrow start="StorTower" startAnchor= {["right", {position: "left", offset: {y: -20}}]}  end="Generation" endAnchor="bottom" color='#64B42C' path='grid' dashness={{ animation: 1 }}  showHead={false} labels={{start:<div style={{ fontSize: "1.5em", marginRight: "3rem", marginBottom: "2rem"}}>0.00 Kwh</div>}}/>
                <Xarrow start="StorTower" startAnchor= {["left", {position: "right", offset: {y: -20}}]} end="Grid" endAnchor="bottom" color='#64B42C' path='grid' dashness={{ animation: 1 }}  showHead={false} labels={{start:<div style={{ fontSize: "1.5em", marginLeft: "3rem", marginBottom: "2rem"}}>0.00 Kwh</div>}}/>
                <Xarrow start="StorTower" startAnchor= {["right", {position: "left", offset: {y: 20}}]} end="Battery" endAnchor="top" color='#64B42C' path='grid' dashness={{ animation: 1 }}  showHead={false} labels={{start:<div style={{ fontSize: "1.5em", marginRight: "3rem", marginTop: "5rem"}}>0.00 Kwh</div>}}/>
                <Xarrow start="StorTower" startAnchor= {["left", {position: "right", offset: {y: 20}}]} end="Home" endAnchor="top"color='#64B42C' path='grid' dashness={{ animation: 1 }}  showHead={false} labels={{start:<div style={{ fontSize: "1.5em", marginLeft: "3rem", marginTop: "5rem"}}>0.00 Kwh</div>}}/>
            </div>

        )
    }
export default Diagram;