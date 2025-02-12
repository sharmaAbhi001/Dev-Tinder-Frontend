import {useDispatch, useSelector } from "react-redux"
import Navbar from "./Navbar"
import { Outlet, useNavigate } from "react-router"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"
import axios from "axios"





const Body = () => {
 const navigate = useNavigate();
  const dispatcher = useDispatch();
  const user = useSelector(state=>state.user.user)

  const fetchData = async (user) => {
    try {
      if(user) return;
      const response = await axios.get('http://localhost:3000/api/v1/profile/view', {
        withCredentials: true, 
      });
    
      
      if(response.status===200)
      {
        dispatcher(addUser(response.data));
        
      }
     
    } catch (error) {
      navigate("/login")
      console.log(error);
      
    }
  };
  
  useEffect(() => {
    fetchData(user);
  },[]);



  return (
    <>
    <Navbar />
    <Outlet />
    </>
  )
}

export default Body
