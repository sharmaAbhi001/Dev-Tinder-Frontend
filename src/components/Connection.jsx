import axios from "axios"
import ConnectionCard from "./ConnectionCard"
import { useContext, useEffect, useState } from "react";
import Simmer from "./Simmer";
import { useDispatch,} from "react-redux";
import { addConnecctionData } from "../utils/connectionStore";
import { _BASE_URL } from "../utils/constent";
import { DataContext } from "../utils/DataContext";


const Connection = () => {

  const {setData} = useContext(DataContext);

    const [connectionData,setConnectionData] = useState([]);
    const dispatcher = useDispatch();

    const fetchUserConnections = async () =>{
      try {
        const response = await axios.get(_BASE_URL+"/api/v1/user/connections",{withCredentials:true});
        setConnectionData(response.data.data);    
        dispatcher(addConnecctionData(response.data.data));
        setData(response.data.data);
        sessionStorage.setItem("appData",JSON.stringify(response.data.data))
      } catch (error) {
        alert(error.response.data)
      }
    }

    useEffect(()=>{
    fetchUserConnections();
    },[])

    if ( connectionData.length === 0) {
      return <div className="mt-8 text-center" >No Connection Found</div>
    }

    if (!connectionData || connectionData.length === 0) {
        return <Simmer />;
      }
  return (
    <div>
        <h1 className="text-center font-bold size-">Your Connections </h1>
      {connectionData&& connectionData.map((data,index)=>(< ConnectionCard key={index} data={data} />))}
    </div>
  )
}

export default Connection
