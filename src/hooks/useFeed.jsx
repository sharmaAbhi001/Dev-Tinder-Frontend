import axios from "axios"
import { useDispatch } from "react-redux"
import { addFeedData } from "../utils/feedSlice";
import { _BASE_URL } from "../utils/constent";

const useFeed = () => {

    const dispatcher = useDispatch();

    const feedApiHandler= async ()=>{

       try {
        const response = await axios.get(_BASE_URL+"/api/v1/user/feed",{
            withCredentials:true,
        });
        if(response.status===200)
        {
            console.log(response.data);
            
            dispatcher(addFeedData(response.data));
        }
       } catch (error) {
          (error)
        
       }

    }


  return feedApiHandler
}

export default useFeed
