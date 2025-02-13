import {  useState } from "react";
import { useNavigate } from "react-router";
import { _BASE_URL } from "../utils/constent";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); 

  const forgetPasswordHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(_BASE_URL + "/api/v1/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailId: email }), 
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        navigate("/login");
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Something went wrong: " + error.message);
    }
  };

  return (
    <div className="bg-slate-700 flex items-center justify-center h-screen">
    <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-96">
      <h2 className="text-white text-2xl font-bold text-center mb-4">Forget Password</h2>
      <form onSubmit={forgetPasswordHandler}>
        <label className="block font-medium text-white text-xl mb-2">
          Enter Your Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none mb-4"
          type="password"
          placeholder="your Emailid"
          required
        />
        <button
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 mt-4"
          type="submit"
        >
         Submit
        </button>
      </form>
    </div>
  </div>
  );
};

export default ForgetPassword;
