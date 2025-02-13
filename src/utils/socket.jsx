import { io } from "socket.io-client";
import { _BASE_URL } from "./constent";



function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        let [key, value] = cookie.split("=");
        if (key === name) return decodeURIComponent(value);
    }
    return null;
}

// Token fetch karo


export const createSocketConnection =()=>{

    const token = getCookie("token");
    if (!token) {
        alert("❌ No token found! Authentication failed.");
        return null;
    }
    return io(_BASE_URL,{
        auth:{token},
        withCredentials:true
    })
}

