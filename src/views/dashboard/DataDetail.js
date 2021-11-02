import { CDataTable} from "@coreui/react"
import { useHistory } from "react-router"
import { useEffect ,useState } from "react"

const DataDetail=()=>{
  const id=useHistory().location.pathname.split('/').lastItem

    const [usersData,setUserData] = useState(null); 
    
      const fields = [
        'name',
        'registered',
        'role',
        'status',
      ]
      useEffect(() => {
        fetch(`https://dashboard-backend-rapid.herokuapp.com/raw_data/${id}`,{
        method: "get",
        })
        .then(response=>response.json())
        .then(data=>{
          console.log(data[0]);
          setUserData({})
        })
        .catch(err=>{console.log(err)})  
      }, [id])
      
      return (
        <CDataTable
          items={usersData}
          fields={fields}
          itemsPerPage={15}
          hover
          sorter
          pagination
        />
      )

}
export default DataDetail

