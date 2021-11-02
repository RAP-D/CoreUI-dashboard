
import {
  
  CTabs,
  CTabPane,
  CNavItem,
  CTabContent,
  CNavLink,
  CNav,
  CBadge,
  CContainer,
} from '@coreui/react'
import Charts from '../charts/Charts'
import Storhub from './StorhubData'
import HouseData from './HouseData'
import DataDetail from './DataDetail'
import './Dashboard.css'
import { useHistory } from 'react-router'


const Dashboard = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  const dataType=useHistory().location.pathname.split('/')[useHistory().location.pathname.split('/').length-2];
  return ( 
    <>
      <CTabs activeTab="statistical-overview">

        <CNav variant="tabs" >

          <CNavItem>
            <CNavLink data-tab="statistical-overview" className="text-success">
            System Overview
            </CNavLink>
          </CNavItem>
          {dataType==='house'? <> 
          <CNavItem>
            <CNavLink data-tab="data-chart" className="text-success">
              AI Overview
            </CNavLink>
          </CNavItem>

          <CNavItem>
            <CNavLink data-tab="parameter-analysis" className="text-success">
              Parameter Analysis
            </CNavLink>
          </CNavItem>

          <CNavItem>
            <CNavLink data-tab="data-detail" className="text-success">
              Data Detail
            </CNavLink>
          </CNavItem>
          </>:null}

          <CNavItem className="ml-auto pt-2">
            <CContainer  >
              Status:<CBadge className="ml-2"color="success"> Normal </CBadge>
              <h1>Date : {today}</h1>
            </CContainer>
          </CNavItem>
        </CNav>


        <CTabContent className="pt-4">
          <CTabPane data-tab="statistical-overview" className="py-10">
          {dataType==='storhub'?<Storhub/>:<HouseData/>}
          </CTabPane>
          <CTabPane data-tab="data-chart">
            <Charts></Charts>
          </CTabPane>
          <CTabPane data-tab="parameter-analysis">
            789
          </CTabPane>
          <CTabPane data-tab="data-detail">
            <DataDetail/>
          </CTabPane>
        </CTabContent>

      </CTabs>
    </>
  )
}

export default Dashboard
