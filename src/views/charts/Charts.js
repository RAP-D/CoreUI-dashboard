import React from 'react'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
import {
  CChartLine,
} from '@coreui/react-chartjs'

const Charts = () => {

  let tommorow =new Date();
  tommorow.setDate(tommorow.getDate()+1)

  return ( 
    <CCardGroup columns className = "cols-2" >

    <CCard>
      <CCardHeader className="card text-center" style={{fontWeight:"bold"}}>AI Prediction</CCardHeader>
      <CCardBody>
        <CRow>
          <CCol xs={6}>
            <CCard>
              <CCardBody>
                <p style={{fontSize:14, textAlign:"center"}}>{String(tommorow.getDate()).padStart(2, '0')+'/'+String(tommorow.getMonth() + 1).padStart(2, '0')+'/'+tommorow.getFullYear()} Predicted</p>
                <p style={{fontSize:14, textAlign:"center"}}>Generation (KWH)</p>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs={6}>
            <CCard>
              <CCardBody>
                <p style={{fontSize:14, textAlign:"center"}}>{String(tommorow.getDate()).padStart(2, '0')+'/'+String(tommorow.getMonth() + 1).padStart(2, '0')+'/'+tommorow.getFullYear()} Predicted</p>
                <p style={{fontSize:14, textAlign:"center"}}>Consumption (KWH)</p>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
    

      <CCard>
        <CCardHeader className="card text-center" style={{fontWeight:"bold"}}>
          Consumption Predictions vs Actual
        </CCardHeader>
        <CCardBody>
          <CChartLine
            datasets={[
              {
                label: 'Actual',
                borderColor: 'rgb(99,178,46)',
                backgroundColor: "rgb(0,0,0,0)",
                data: [10.978775, 8.549949999999999, 11.651725, 11.063525, 10.30405]
              },
              {
                label: 'predicted',
                borderColor: 'rgb(70,84,108)',
                backgroundColor: "rgb(0,0,0,0)",
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
        <CCardHeader className="card text-center" style={{fontWeight:"bold"}}>Calcutaion</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol xs={6}>
              <CCard>
                <CCardBody>
                <p style={{fontSize:14, textAlign:"center"}}>Change Window</p>
                <p style={{fontSize:14, textAlign:"center"}}>12:30-23:45</p>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={6}>
              <CCard>
                <CCardBody>
                <p style={{fontSize:14, textAlign:"center"}}>Charge Current A</p>
                <p style={{fontSize:14, textAlign:"center"}}>2400A</p>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader className="card text-center" style={{fontWeight:"bold"}}>
          PV Predictions vs Actual
        </CCardHeader>
        <CCardBody>
          <CChartLine
            datasets={[
              {
                label: 'Actual',
                borderColor: 'rgb(99,178,46)',
                backgroundColor: "rgb(0,0,0,0)",
                data: [31.552550000000007, 7.3172, 6.101234435, 26.74808421053431, 25.125850034753]
              },
              {
                label: 'predicted',
                borderColor: 'rgb(70,84,108)',
                backgroundColor: "rgb(0,0,0,0)",
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
