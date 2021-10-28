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
import { useHistory } from 'react-router'

const Charts = () => {
  const id=useHistory().location.pathname.split('/').lastItem

  const initialDataChartPredicrtions={
    date:[],
    charge_time:[],
    actual_consumption:[],
    actual_generation:[],
    predicted_consumption:[],
    predicted_generation:[],
  }
  const initialDataPredicrtions={
    tommrrow_generation:0,
    tommrrow_consumption:0,
    charge_window:'None',
    charge_current:'',
    date:'None'
  }

  const [dataChartPredictions, setDataChartPredictions] = useState(initialDataChartPredicrtions);
  const [dataPredictions, setDataPredictions] = useState(initialDataPredicrtions);
  useEffect(() => {
    setDataChartPredictions({
      date:[],
      charge_time:[],
      actual_consumption:[],
      actual_generation:[],
      predicted_consumption:[],
      predicted_generation:[],
    })
    setDataPredictions({
      tommrrow_generation:0,
      tommrrow_consumption:0,
      charge_window:'None',
      charge_current:0,
      date:'None'
    })

    fetch(`https://dashboard-backend-rapid.herokuapp.com/ai_datapoints/${id}`,{
    method: "get",
    })
    .then(response=>response.json())
    .then(data=>{
      setDataChartPredictions({
        date:[data[4].date,data[3].date,data[2].date,data[1].date,data[0].date],
        charge_time:[data[4].charge_time,data[3].charge_time,data[2].charge_time,data[1].charge_time,data[0].charge_time],
        actual_consumption:[data[4].actual_consumption,data[3].actual_consumption,data[2].actual_consumption,data[1].actual_consumption,data[0].actual_consumption],
        actual_generation:[data[4].actual_generation,data[3].actual_generation,data[2].actual_generation,data[1].actual_generation,data[0].actual_generation],
        predicted_consumption:[data[4].predicted_consumption,data[3].predicted_consumption,data[2].predicted_consumption,data[1].predicted_consumption,data[0].predicted_consumption],
        predicted_generation:[data[4].predicted_generation,data[3].predicted_generation,data[2].predicted_generation,data[1].predicted_generation,data[0].predicted_generation],
      })
    })
    .catch(err=>{console.log(err)})

    fetch(`https://dashboard-backend-rapid.herokuapp.com/tommrrow_prediction/${id}`,{
    method: "get",
    })
    .then(response=>response.json())
    .then(data=>{
      setDataPredictions({
        tommrrow_generation:data[0].tommrrow_generation.toFixed(2),
        tommrrow_consumption:data[0].tommrrow_consumption.toFixed(2),
        charge_window:data[0].charge_window,
        charge_current:data[0].charge_current,
        date:data[0].date
      })
    })
    .catch(err=>{console.log(err)})
  }, [id])

  return ( 
    <CCardGroup columns className = "cols-2" >

    <CCard>
      <CCardHeader className="card text-center" style={{fontWeight:"bold"}}>AI Prediction</CCardHeader>
      <CCardBody>
        <CRow>
          <CCol xs={6}>
            <CCard>
              <CCardBody>
                <p style={{fontSize:14, textAlign:"center"}}>{dataPredictions.date} Predicted</p>
                <p style={{fontSize:14, textAlign:"center"}}>Generation {dataPredictions.tommrrow_generation} (kWh)</p>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs={6}>
            <CCard>
              <CCardBody>
                <p style={{fontSize:14, textAlign:"center"}}>{dataPredictions.date} Predicted</p>
                <p style={{fontSize:14, textAlign:"center"}}>Consumption {dataPredictions.tommrrow_consumption} (kWh)</p>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
    

      <CCard>
        <CCardHeader className="card text-center" style={{fontWeight:"bold"}}>
          Consumption Predictions (kWh) vs Actual (kWh)
        </CCardHeader>
        <CCardBody>
          <CChartLine
            datasets={[
              {
                label: 'Actual',
                borderColor: 'rgb(99,178,46)',
                backgroundColor: "rgb(0,0,0,0)",
                data: dataChartPredictions.actual_consumption
              },
              {
                label: 'Predicted',
                borderColor: 'rgb(70,84,108)',
                backgroundColor: "rgb(0,0,0,0)",
                data: dataChartPredictions.predicted_consumption
              }
            ]}
            options={{
              tooltips: {
                enabled: true
              }
            }}
            labels={dataChartPredictions.date}
            
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader className="card text-center" style={{fontWeight:"bold"}}>Calculation</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol xs={6}>
              <CCard>
                <CCardBody>
                <p style={{fontSize:14, textAlign:"center"}}>{dataPredictions.date} Charge Window</p>
                <p style={{fontSize:14, textAlign:"center"}}>{dataPredictions.charge_window} (HHMM-HHMM)</p>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={6}>
              <CCard>
                <CCardBody>
                <p style={{fontSize:14, textAlign:"center"}}>{dataPredictions.date} Charge Current</p>
                <p style={{fontSize:14, textAlign:"center"}}>{dataPredictions.charge_current} (A)</p>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader className="card text-center" style={{fontWeight:"bold"}}>
          PV Predictions (kWh) vs Actual (kWh)
        </CCardHeader>
        <CCardBody>
          <CChartLine
            datasets={[
              {
                label: 'Actual',
                borderColor: 'rgb(99,178,46)',
                backgroundColor: "rgb(0,0,0,0)",
                data: dataChartPredictions.actual_generation
              },
              {
                label: 'Predicted',
                borderColor: 'rgb(70,84,108)',
                backgroundColor: "rgb(0,0,0,0)",
                data: dataChartPredictions.predicted_generation
              }
            ]}
            options={{
              tooltips: {
                enabled: true
              }
            }}
            labels={dataChartPredictions.date}
          />
        </CCardBody>
      </CCard>

     
    </CCardGroup>
  )
}

export default Charts
