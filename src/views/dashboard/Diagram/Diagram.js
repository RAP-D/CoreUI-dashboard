import React, {useRef} from "react";
import Xarrow from "react-xarrows";
import './Diagram.css';
import SolarPanel from './solar-panel.svg';
import PowerTower from './power-tower.svg';
import Stortera from './stortera.svg';
import Battery from './battery-status.svg';
import Home from './lightbulb.svg';

const BulmaDiagram = ()=>{
    const generation = useRef(null);
    const grid = useRef(null);
    const storTower = useRef(null);
    const battery = useRef(null);
    const home = useRef(null);
    const part1 = useRef(null);
    const part2 = useRef(null);
    const part3 = useRef(null);
    const part4 = useRef(null);
        return(
            <div className="bulma-col columns is-2 is-multiline is-mobile">
                <div className="column  is-4">
                        <center>
                        <div className="heightadjust">
                                <div className = "nodeIcon" ref={part1}>
                                        <img className="icon loku" src={SolarPanel} alt="Generation" ref={generation}/>
                                        <div className="nodename">Generation</div>
                                </div>
                        </div>
                        </center>
                </div>
                <div className="column is-4"></div>

                <div className="column is-4">
                        <center>
                        <div className="heightadjust">
                                <div className = "nodeIcon" ref={part2}>
                                        <img className="icon loku" src={PowerTower} alt="Grid" ref={grid} />
                                        <div className="nodename">Grid</div>
                                </div>
                        </div>
                        </center>
                </div>
                <div className="column is-4"></div>

                <div className="column is-4">
                        <img className="icon tower" src={Stortera} alt="StorTower" ref={storTower} />
                        <div>StorTower</div>
                </div>
                <div className="column is-4"></div>

                <div className="column is-4">
                        <center>
                        <div className="heightadjust">
                                <div className = "nodeIcon" ref={part3}>
                                        <img className="icon loku" src={Battery} alt="Battery" ref={battery} />
                                        <div className="nodename">Battery</div>
                                </div>
                        </div>
                        </center>
                </div>
                <div className="column is-4"></div>
                
                <div className="column is-4">
                        <center>
                        <div className="heightadjust">
                                <div className = "nodeIcon" ref={part4}>
                                        <img className="icon loku" src={Home} alt="Home" ref={home} />
                                        <div className="nodename">Home</div>
                                </div>
                        </div>
                        </center>
                </div>
                <Xarrow start={storTower} startAnchor= {["right", {position: "left", offset: {y: -20}}]}  end={part1} endAnchor="bottom" color='#64B42C' path='grid' dashness={{ animation: 1 }}  showHead={false}/>
                <Xarrow start={storTower} startAnchor= {["left", {position: "right", offset: {y: -20}}]} end={part2} endAnchor="bottom" color='#64B42C' path='grid' dashness={{ animation: 1 }}  showHead={false} />
                <Xarrow start={storTower} startAnchor= {["right", {position: "left", offset: {y: 20}}]} end={part3} endAnchor="top" color='#64B42C' path='grid' dashness={{ animation: 1 }}  showHead={false}/>
                <Xarrow start={storTower} startAnchor= {["left", {position: "right", offset: {y: 20}}]} end={part4} endAnchor="top"color='#64B42C' path='grid' dashness={{ animation: 1 }}  showHead={false}/>
            </div>

        )
    }
export default BulmaDiagram;