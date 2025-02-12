import {  useEffect, useRef, useState } from "react";
import LoginLeft from "./LoginLeft";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { _BASE_URL } from "../utils/constent";

const LoginAndSignup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const FirstNameRef = useRef();
  const LastNameRef = useRef()
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const user = useSelector(state=>state.user.user)


  useEffect(()=>{
      if(user)
      {
       navigate("/")
      }
  },[user])

  const [activeForm, setActiveForm] = useState("register");


  const showForm = (form) => {
    setActiveForm(form);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      emailId:emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const response = await axios.post(_BASE_URL+"/api/v1/login",loginData, {
        withCredentials: true,
        headers: {
          "Accept": "application/json", 
        },
      });
  
      if (response.status === 200) {  
        dispatcher(addUser(response.data));
        alert("Login Successful!");
         navigate("/");
      } else  {
        alert("Login Failed hooooga: " + response.data);
      }
    } catch (error) {
      console.log(error);
      
      alert("Login Failed: " + (error.response?.data || "Something went wrong"));
    }
  };

  const handleCreatAnAccountSubmit = async (e) =>{
    e.preventDefault();

    const creatAccountData = {
      firstName:FirstNameRef.current.value,
      lastName:LastNameRef.current.value,
      emailId:emailRef.current.value,
      password:passwordRef.current.value,
    }

    try {
      const response = await axios.post(_BASE_URL+"/api/v1/signup",creatAccountData,{
        headers:{
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 201) {
        alert("Account create Successful!");
      } else {
        console.log("account nhi kcrea");
        alert("Account create Failed: " + response.data.message);
      }
    } catch (error) {
      console.log(error);
      
      alert("Account create Failede: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="flex bg-blue-950">
      <div className="h-screen w-6/12">
        <LoginLeft></LoginLeft>
      </div>
      <div className="w-6/12 flex justify-center pt-10 ">
        <div className="w-4/6  h-full rounded-xl ">
          <div className="flex-col text-center mt-6">
            <h1 className="text-white text-3xl font-bold">DevTinder</h1>
            <p className="text-white text-xl font-sm">
              Find your perfect coding partner
            </p>
          </div>

          {/* button for login and register  */}
          <div className="space-x-[55px] text-center mt-8">
            <button
              onClick={() => showForm("login")}
              className={`text-white px-6 py-2 rounded-md
             ${ activeForm === "login"
             ?  "bg-red-700 hover:bg-red-500 transition duration-300 shadow-md"
             : "bg-transparent"
         }` }>
              Login
            </button>
            <button
              onClick={() => showForm("register")}
              
              className={`text-white px-6 py-2 rounded-md
                ${ activeForm === "register"
                ?  "bg-red-700 hover:bg-red-500 transition duration-300 shadow-md"
                : "bg-transparent"
            }` }
            >
              Register
            </button>
          </div>

          {/* from for login */}

          {activeForm === "login" ? (
            <form
              action=""
              onSubmit={handleLoginSubmit}
              className="pt-8 space-y-6"
            >
              <div className="">
                <label className="block font-medium text-white text-xl mb-1">
                  Email
                </label>
                <input
                  className="w-full px-2 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  type="email"
                  name="email"
                  id="email"
                  required
                  ref={emailRef}
                  placeholder="chutiya.burchattaburkumar@gmail.com"
                />
              </div>
              <div>
                <label className="block font-medium text-white text-xl mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  ref={passwordRef}
                  placeholder="*******"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <button onClick={()=>navigate("/forget-password")} className="text-sm text-purple-600 hover:text-purple-500">  Forgot password?</button>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200"
              >
                Sign in
              </button>
            </form>
          ) : (
            <form action="" onSubmit={handleCreatAnAccountSubmit} >
              <div>
                <label
                  htmlFor=""
                  className="block font-medium text-white text-xl mb-1"
                >
                  Firstname
                </label>
                <input
                  type="name"
                  required
                  name="firstName"
                  className="w-full px-2 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  id="name1"
                  ref={FirstNameRef}
                  placeholder="Dubey Landchatt"
                />
              </div>
              <div>
                <label
                  htmlFor=""
                  className="block font-medium text-white text-xl mb-1"
                >
                  Lastname
                </label>
                <input
                  type="name"
                  name="firstName"
                  className="w-full px-2 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  id="name2"
                  ref={LastNameRef}
                  placeholder="Chutiya bhi hai"
                />
              </div>
              <div className="">
                <label className="block font-medium text-white text-xl mb-1">
                  Email
                </label>
                <input
                  className="w-full px-2 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  type="email"
                  name="email"
                  id="email"
                  required
                  ref={emailRef}
                  placeholder="chutiya.burchattaburkumar@gmail.com"
                />
              </div>
              <div>
                <label className="block font-medium text-white text-xl mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  ref={passwordRef}
                  placeholder="*******"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 mt-4"
              >
                Sign up
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginAndSignup;
