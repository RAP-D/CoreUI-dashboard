import { CDataTable} from "@coreui/react"
import { useHistory } from "react-router"
import { useEffect ,useState } from "react"

const DataDetail=()=>{
  const id=useHistory().location.pathname.split('/').lastItem
  const [tableData,setTableData] = useState([]); 
    
      const fields = [
        "index",
        "Timestamp",
        "Device Model",
        "Output rated VA(W)",
        "Output Power Factor(%)",
        "Grid Phase",
        "Nominal device Voltage(V)",
        "Nominal Grid Voltage(V)",
        "Battery Piece Number",
        "Battery standard voltage per unit(V)",
        "Grid rating voltage(V)",
        "Grid rating frequency(Hz)",
        "Grid rating current(A)",
        "AC output rating voltage(V)",
        "AC output rating current(A)",
        "Per MPPT rating current(A)",
        "Battery rating voltage(A)",
        "MPPT Track Number",
        "Machine Type",
        "Topology",
        "Total Energy(kWh)",
        "Grid Output Voltage High Loss Point(V)",
        "Grid Output Voltage Low Loss Point(V)",
        "Grid Output Frequency High Loss Point(Hz)",
        "Grid Output Frequency Low Loss Point(Hz)",
        "Current Maximum Output Power(kW)",
        "Grid voltage R(V)",
        "Grid power R(W)",
        "Grid Frequency(Hz)",
        "Grid Current(A)",
        "AC output voltage R(V)",
        "AC output power R(W)",
        "AC Output Frequency(Hz)",
        "AC Output Current R(A)",
        "Output load percent(%)",
        "P BUS Voltage(V)",
        "S BUS Voltage(V)",
        "P Battery Voltage(V)",
        "N Battery Voltage(V)",
        "Battery Capacity(%)",
        "PV1 Input Power(W)",
        "PV2 Input Power(W)",
        "PV3 Input Power(W)",
        "PV1 Input Voltage(V)",
        "PV2 Input Voltage(V)",
        "Temperature(°C)",
        "Load Status",
        "Battery Status",
        "Inv Energy Flow Direction",
        "Line Status"
      ]
      useEffect(() => {
        fetch(`https://dashboard-backend-rapid.herokuapp.com/raw_data/${id}`,{
        method: "get",
        })
        .then(response=>response.json())
        .then(data=>{
          const tempTableData=[]
          data.forEach(element => {
              const row={}
              row.index=element["index"]
              row.timestamp=element["Timestamp"]
              row.deviceModel=element["Device Model"]
              row.outputrated=element["Output rated VA(W)"]
              row.outputPowerFactor=element["Output Power Factor(%)"]
              row.gridPhase=element["Grid Phase"]
              row.nominalDeviceVoltage=element["Nominal device Voltage(V)"]
              row.nominalGridVoltage=element["Nominal Grid Voltage(V)"]
              row.batteryPieceNumber=element["Battery Piece Number"]
              row.batteryStandardVoltagePerUnit=element["Battery standard voltage per unit(V)"]
              row.gridRatingVoltage=element["Grid rating voltage(V)"]
              row.gridRatingFrequency=element["Grid rating frequency(Hz)"]
              row.GridRatingCurrent=element["Grid rating current(A)"]
              row.aCOutputRatingVoltage=element["AC output rating voltage(V)"]
              row.aCOutputRatingCurrent=element["AC output rating current(A)"]
              row.perMPPTRatingCurrent=element["Per MPPT rating current(A)"]
              row.batteryRatingVoltage=element["Battery rating voltage(A)"]
              row.mPPTTrackNumber=element["MPPT Track Number"]
              row.machineType=element["Machine Type"]
              row.topology=element["Topology"]
              row.totalEnergy=element["Total Energy(kWh)"]
              row.gridOutputVoltageHighLossPoint=element["Grid Output Voltage High Loss Point(V)"]
              row.gridOutputVoltageLowLossPoint=element["Grid Output Voltage Low Loss Point(V)"]
              row.gridOutputFrequencyHighLossPoint=element["Grid Output Frequency High Loss Point(Hz)"]
              row.gridOutputFrequencyLowLossPoint=element["Grid Output Frequency Low Loss Point(Hz)"]
              row.currentMaximumOutputPower=element["Current Maximum Output Power(kW)"]
              row.gridVoltageR=element["Grid voltage R(V)"]
              row.gridPowerR=element["Grid power R(W)"]
              row.gridFrequency=element["Grid Frequency(Hz)"]
              row.gridCurrent=element["Grid Current(A)"]
              row.aCOutputVoltageR=element["AC output voltage R(V)"]
              row.aCOutputPowerR=element["AC output power R(W)"]
              row.aCOutputFrequency=element["AC Output Frequency(Hz)"]
              row.outputLoadPercent=element["Output load percent(%)"]
              row.pBUSVoltage=element["P BUS Voltage(V)"]
              row.sBUSVoltage=element["S BUS Voltage(V)"]
              row.pBatteryVoltage=element["P Battery Voltage(V)"]
              row.nBatteryVoltage=element["N Battery Voltage(V)"]
              row.batteryCapacity=element["Battery Capacity(%)"]
              row.pV1InputPower=element["PV1 Input Power(W)"]
              row.pV2InputPower=element["PV2 Input Power(W)"]
              row.pV3InputPower=element["PV3 Input Power(W)"]
              row.pV1InputVoltage=element["PV1 Input Voltage(V)"]
              row.pV2InputVoltage=element["PV2 Input Voltage(V)"]
              row.temperature=element["Temperature(°C)"]
              row.loadStatus=element["Load Status"]
              row.batteryStatus=element["Battery Status"]
              row.invEnergyFlowDirection=element["Inv Energy Flow Direction"]
              row.lineStatus=element["Line Status"]
              tempTableData.push(row)
          });
          setTableData(tempTableData)
        })
        .catch(err=>{console.log(err)})  
      }, [id])
      
      return (
        <CDataTable
          items={tableData}
          fields={fields}
          itemsPerPage={15}
          hover
          sorter
          pagination
        />
      )

}
export default DataDetail

