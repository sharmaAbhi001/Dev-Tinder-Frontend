import axios from "axios"
import ConnectionCard from "./ConnectionCard"
import { useEffect, useState } from "react";
import Simmer from "./Simmer";
import { useDispatch,} from "react-redux";
import { addConnecctionData } from "../utils/connectionStore";
import { _BASE_URL } from "../utils/constent";
const Connection = () => {

    const [connectionData,setConnectionData] = useState([]);
    const dispatcher = useDispatch();

    const fetchUserConnections = async () =>{
      try {
        const response = await axios.get(_BASE_URL+"/api/v1/user/connections",{withCredentials:true});
        setConnectionData(response.data.data);
        dispatcher(addConnecctionData(response.data.data));
        
      } catch (error) {
        alert(error)
      }
    }

    useEffect(()=>{
    fetchUserConnections();
    },[])

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
