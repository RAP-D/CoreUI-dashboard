import { CDataTable} from "@coreui/react"
import { useHistory } from "react-router"
import { useEffect ,useState } from "react"

const DataDetail=()=>{
  const id=useHistory().location.pathname.split('/').lastItem
  const [tableData,setTableData] = useState([]); 
    
      const fields = [
        {key:"index",label: 'Index'},
        {key:"timestamp",label: 'Timestamp'},
        {key:"deviceModel",label: "Device Model"},
        {key:"outputrated",label: "Output rated VA(W)"},
        {key:"outputPowerFactor",label: "Output Power Factor(%)"},
        {key:"gridPhase",label: "Grid Phase"},
        {key:"nominalDeviceVoltage",label: "Nominal device Voltage(V)"},
        {key:"nominalGridVoltage",label:"Nominal Grid Voltage(V)"},
        {key:"batteryPieceNumber",label:"Battery Piece Number"},
        {key:"batteryStandardVoltagePerUnit",label:"Battery standard voltage per unit(V)"},
        {key:"gridRatingVoltage",label:"Grid rating voltage(V)"},
        {key:"gridRatingFrequency",label:"Grid rating frequency(Hz)"},
        {key:"GridRatingCurrent",label:"Grid rating current(A)"},
        {key:"aCOutputRatingVoltage",label:"AC output rating voltage(V)"},
        {key:"aCOutputRatingCurrent",lable:"AC output rating current(A)"},
        {key:"perMPPTRatingCurrent",label:"Per MPPT rating current(A)"},
        {key:"batteryRatingVoltage",lable:"Battery rating voltage(A)"},
        {key:"mPPTTrackNumber",label:"MPPT Track Number"},
        {key:"machineType",lable:"Machine Type"},
        {key:"topology",label:"Topology"},
        {key:"totalEnergy",label:"Total Energy(kWh)"},
        {key:"gridOutputVoltageHighLossPoint",label:"Grid Output Voltage High Loss Point(V)"},
        {key:"gridOutputVoltageLowLossPoint",lable:"Grid Output Voltage Low Loss Point(V)"},
        {key:"gridOutputFrequencyHighLossPoint",label:"Grid Output Frequency High Loss Point(Hz)"},
        {key:"gridOutputFrequencyLowLossPoint",label:"Grid Output Frequency Low Loss Point(Hz)"},
        {key:"currentMaximumOutputPower",label:"Current Maximum Output Power(kW)"},
        {key:"gridVoltageR",label:"Grid voltage R(V)"},
        {key:"gridPowerR",label:"Grid power R(W)"},
        {key:"gridFrequency",label:"Grid Frequency(Hz)"},
        {key:"gridCurrent",label:"Grid Current(A)"},
        {key:"aCOutputVoltageR",label:"AC output voltage R(V)"},
        {key:"aCOutputPowerR",label:"AC output power R(W)"},
        {key:"aCOutputFrequency",label:"AC Output Frequency(Hz)"},
        {key:"aCOutputCurrentR",label:"AC Output Current R(A)"},
        {key:"outputLoadPercent",label:"Output load percent(%)"},
        {key:"pBUSVoltage",label:"P BUS Voltage(V)"},
        {key:"sBUSVoltage",label:"S BUS Voltage(V)"},
        {key:"pBatteryVoltage",label:"P Battery Voltage(V)"},
        {key:"nBatteryVoltage",label:"N Battery Voltage(V)"},
        {key:"batteryCapacity",label:"Battery Capacity(%)"},
        {key:"pV1InputPower",label:"PV1 Input Power(W)"},
        {key:"pV2InputPower",label:"PV2 Input Power(W)"},
        {key:"pV3InputPower",label:"PV3 Input Power(W)"},
        {key:"pV1InputVoltage",label:"PV1 Input Voltage(V)"},
        {key:"pV2InputVoltage",label:"PV2 Input Voltage(V)"},
        {key:"temperature",label:"Temperature(°C)"},
        {key:"loadStatus",label:"Load Status"},
        {key:"batteryStatus",label:"Battery Status"},
        {key:"invEnergyFlowDirection",label:"Inv Energy Flow Direction"},
        {key:"lineStatus",label:"Line Status"}
      ]
      useEffect(() => {
        setTableData([])
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
              row.aCOutputCurrentR=element["AC Output Current R(A)"]
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

