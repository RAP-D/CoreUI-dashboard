import React ,{useState,useEffect} from 'react'
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

  const initialPredicrtions={
    date:[],
    charge_time:[],
    actual_consumption:[],
    actual_generation:[],
    predicted_consumption:[],
    predicted_generation:[]
  }
  const [Predictions, setPredictions] = useState(initialPredicrtions);
  let tommorow =new Date();
  tommorow.setDate(tommorow.getDate()+1)
  useEffect(() => {
    fetch('https://dashboard-backend-rapid.herokuapp.com/',{
    method: "get",
    })
    .then(response=>response.json())
    .then(data=>{
      setPredictions({
        date:[data[4].date,data[3].date,data[2].date,data[1].date,data[0].date],
        charge_time:[data[4].charge_time,data[3].charge_time,data[2].charge_time,data[1].charge_time,data[0].charge_time],
        actual_consumption:[data[4].actual_consumption,data[3].actual_consumption,data[2].actual_consumption,data[1].actual_consumption,data[0].actual_consumption],
        actual_generation:[data[4].actual_generation,data[3].actual_generation,data[2].actual_generation,data[1].actual_generation,data[0].actual_generation],
        predicted_consumption:[data[4].predicted_consumption,data[3].predicted_consumption,data[2].predicted_consumption,data[1].predicted_consumption,data[0].predicted_consumption],
        predicted_generation:[data[4].predicted_generation,data[3].predicted_generation,data[2].predicted_generation,data[1].predicted_generation,data[0].predicted_generation],
      })
    })
    .catch(err=>{console.log(err)})
  }, [])

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
                data: Predictions.actual_consumption
              },
              {
                label: 'predicted',
                borderColor: 'rgb(70,84,108)',
                backgroundColor: "rgb(0,0,0,0)",
                data: Predictions.predicted_consumption
              }
            ]}
            options={{
              tooltips: {
                enabled: true
              }
            }}
            labels={Predictions.date}
            
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
                data: Predictions.actual_generation
              },
              {
                label: 'predicted',
                borderColor: 'rgb(70,84,108)',
                backgroundColor: "rgb(0,0,0,0)",
                data: Predictions.predicted_generation
              }
            ]}
            options={{
              tooltips: {
                enabled: true
              }
            }}
            labels={Predictions.date}
          />
        </CCardBody>
      </CCard>

     
    </CCardGroup>
  )
}

export default Charts
