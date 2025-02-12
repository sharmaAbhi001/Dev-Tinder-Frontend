import { useRef } from "react"
import { useNavigate, useParams } from "react-router";
import { _BASE_URL } from "../utils/constent";

const ResetPassword = () => {

   const {token} = useParams();
   
    const refPassword = useRef();
    const navigate = useNavigate();

    const newPasswordSubmit = async (e) => {
        
         e.preventDefault();
         const password = refPassword.current.value;

        try {
            
            const response = await fetch(`${_BASE_URL}/api/v1/password-reset/${token}`,{
                    method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({password:password})
            });

            const result = await response.json();
           if(response.ok)
           {
                   alert(result.message);
                   navigate("/")
           }
            

        } catch (error) {
            alert("something went wrong"+error.message)
        }
    }


  return (
    <div className="bg-slate-700">
      ForgetPassword
      <div>
        <form onSubmit={newPasswordSubmit} >
          <label
            className="block font-medium text-white text-xl mb-1"
            htmlFor=""
          >
            Enter a Valid email Id
          </label>
          <input
          ref={refPassword}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none mt-8"
            type="password"
          />
          <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 mt-8" type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
