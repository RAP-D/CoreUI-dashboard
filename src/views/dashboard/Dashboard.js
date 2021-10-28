
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
import Data from './Data'
import DataDetail from './DataDetail'
import './Dashboard.css'


const Dashboard = () => {
  return ( 
    <>
      <CTabs activeTab="statistical-overview">

        <CNav variant="tabs" >

          <CNavItem>
            <CNavLink data-tab="statistical-overview" className="text-success">
            System Overview
            </CNavLink>
          </CNavItem>

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

          <CNavItem className="ml-auto pt-2">
            <CContainer  >
              Status:<CBadge className="ml-2"color="success"> Normal </CBadge>
            </CContainer>
          </CNavItem>
        </CNav>


        <CTabContent className="pt-4">
          <CTabPane data-tab="statistical-overview" className="py-10">
            <Data/>
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
