import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { _BASE_URL } from "../utils/constent";




const useLogout = () => {
 
    const dispatcher = useDispatch();
    const navigate = useNavigate()

    const logout = async () => {
        try {
          const response = await fetch(_BASE_URL+"/api/v1/logout", {
            method: "POST",
            credentials: "include",
          });
    
          if (response.ok) {
            dispatcher(removeUser());
            navigate("/login");
          }
        } catch (error) {
          console.error("Logout failed:", error);
        }
    }
    return logout;
}

export default useLogout
