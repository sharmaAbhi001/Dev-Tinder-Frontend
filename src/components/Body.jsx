import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import { Outlet, useNavigate, useLocation } from "react-router";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import axios from "axios";
import { _BASE_URL } from "../utils/constent";

const Body = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatcher = useDispatch();
  const user = useSelector((state) => state.user.user);

  const isResetPasswordPage = location.pathname.startsWith("/reset-password");
  

  const fetchData = async (user) => {
    try {
      if (user) return;
      const response = await axios.get(_BASE_URL+"/api/v1/profile/view", {
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatcher(addUser(response.data));
      }
    } catch (error) {
      if (!isResetPasswordPage) {
        navigate("/login"); 
      }
    }
  };

  useEffect(() => {
    fetchData(user);
  }, [user]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Body;

