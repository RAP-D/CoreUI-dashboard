import React from 'react'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader
} from '@coreui/react'
import {
  CChartLine,
} from '@coreui/react-chartjs'
import { DocsLink } from 'src/reusable'

const Charts = () => {

  return (
    <CCardGroup columns className = "cols-2" >
      <CCard>
        <CCardHeader>
          Consumption predictions vs actual
        </CCardHeader>
        <CCardBody>
          <CChartLine
            datasets={[
              {
                label: 'Actual',
                backgroundColor: 'rgb(228,102,81,0.9)',
                data: [10.978775, 8.549949999999999, 11.651725, 11.063525, 10.30405]
              },
              {
                label: 'predicted',
                backgroundColor: 'rgb(0,216,255,0.9)',
                data: [12.45463, 9.2134634, 9.73245, 9.435461, 11.337]
              }
            ]}
            options={{
              tooltips: {
                enabled: true
              }
            }}
            labels="months"
            
          />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          PV predictions vs actual
        </CCardHeader>
        <CCardBody>
          <CChartLine
            datasets={[
              {
                label: 'Actual',
                backgroundColor: 'rgb(228,102,81,0.9)',
                data: [31.552550000000007, 7.3172, 6.101234435, 26.74808421053431, 25.125850034753]
              },
              {
                label: 'predicted',
                backgroundColor: 'rgb(0,216,255,0.9)',
                data: [24.09043263428642, 4.177478065197698, 8.35541751096211, 17.005611065997734, 21.863025672361708]
              }
            ]}
            options={{
              tooltips: {
                enabled: true
              }
            }}
            labels="months"
          />
        </CCardBody>
      </CCard>

     
    </CCardGroup>
  )
}

export default Charts
