import {  useEffect, useRef, useState } from "react";
import LoginLeft from "./LoginLeft";
import axios from "axios";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { _BASE_URL } from "../utils/constent";
import Cookies from "js-cookie";

const LoginAndSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(()=>{
    if(user){
     navigate("/profile")
    }
   },[user])

  const [activeForm, setActiveForm] = useState("register");

  const showForm = (form) => {
    setActiveForm(form);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      emailId: email,
      password: password,
    };
    try {
      const response = await axios.post(_BASE_URL+"/api/v1/login",loginData, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.status === 200) {
        dispatcher(addUser(response.data));
        alert("Login Successful!");
        navigate("/");
      } else {
        alert("Login Failed: " + response.data);
      }
    } catch (error) {
      console.log(error);
      alert("Login Failed: " + (error.response?.data || "Something went wrong"));
    }
  };

  const handleCreateAccountSubmit = async (e) => {
    e.preventDefault();

    const createAccountData = {
      firstName,
      lastName,
      emailId: email,
      password,
    };

    try {
      const response = await axios.post(_BASE_URL + "/api/v1/signup", createAccountData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 201) {
        alert("Account Created Successfully!");
        console.log(response.data);
        dispatcher(addUser(response.data));
        navigate("/profile");
      } else {
        alert("Account Creation Failed: " + response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Account Creation Failed: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="flex bg-blue-950">
      <div className="h-screen w-6/12">
        <LoginLeft />
      </div>
      <div className="w-6/12 flex justify-center pt-10">
        <div className="w-4/6 h-full rounded-xl">
          <div className="flex-col text-center mt-6">
            <h1 className="text-white text-3xl font-bold">DevTinder</h1>
            <p className="text-white text-xl font-sm">Find your perfect coding partner</p>
          </div>

          <div className="space-x-[55px] text-center mt-8">
            <button
              onClick={() => showForm("login")}
              className={`text-white px-6 py-2 rounded-md ${
                activeForm === "login" ? "bg-red-700 hover:bg-red-500 transition duration-300 shadow-md" : "bg-transparent"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => showForm("register")}
              className={`text-white px-6 py-2 rounded-md ${
                activeForm === "register" ? "bg-red-700 hover:bg-red-500 transition duration-300 shadow-md" : "bg-transparent"
              }`}
            >
              Register
            </button>
          </div>

          {activeForm === "login" ? (
            <form onSubmit={handleLoginSubmit} className="pt-8 space-y-6">
              <div>
                <label className="block font-medium text-white text-xl mb-1">Email</label>
                <input
                  className="w-full px-2 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                />
              </div>
              <div>
                <label className="block font-medium text-white text-xl mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*******"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
              <button type="submit" className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200">
                Sign in
              </button>
              <div className="text-center mt-3">
                <Link to="/forget-password" className="text-blue-400 hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handleCreateAccountSubmit}>
              <div>
                <label className="block font-medium text-white text-xl mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full px-2 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-white text-xl mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="w-full px-2 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-white text-xl mb-1">Email</label>
                <input
                  className="w-full px-2 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                />
              </div>
              <div>
                <label className="block font-medium text-white text-xl mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*******"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
              <button type="submit" className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 mt-4">
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

